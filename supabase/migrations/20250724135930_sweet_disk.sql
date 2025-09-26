/*
  # Update orders table and create favorites table

  1. New Tables
    - Update `orders` table with additional company fields
    - Create `favorites` table for user favorites functionality
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `product_id` (text, product identifier)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
    - Users can only access their own orders and favorites

  3. Changes
    - Add company_name, bin, contact_person, email, phone, website, comment to orders
    - Create unique constraint on favorites (user_id, product_id)
*/

-- Update orders table with additional company fields
ALTER TABLE orders ADD COLUMN IF NOT EXISTS company_name TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS bin TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS contact_person TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS website TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS comment TEXT;

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  product_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create unique constraint to prevent duplicate favorites
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'favorites_user_product_unique' 
    AND table_name = 'favorites'
  ) THEN
    ALTER TABLE favorites ADD CONSTRAINT favorites_user_product_unique UNIQUE (user_id, product_id);
  END IF;
END $$;

-- Enable RLS on favorites table
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for favorites table
CREATE POLICY "Users can insert own favorites"
  ON favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own favorites"
  ON favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own favorites"
  ON favorites
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Update existing RLS policies for orders table to ensure they exist
DO $$
BEGIN
  -- Check if policies exist, if not create them
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'orders' AND policyname = 'Users can insert own orders'
  ) THEN
    CREATE POLICY "Users can insert own orders"
      ON orders
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'orders' AND policyname = 'Users can read own orders'
  ) THEN
    CREATE POLICY "Users can read own orders"
      ON orders
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'orders' AND policyname = 'Users can update own orders'
  ) THEN
    CREATE POLICY "Users can update own orders"
      ON orders
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;