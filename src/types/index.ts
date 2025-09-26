export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  benefits: string[];
  features: string[];
}

export interface Review {
  id: string;
  name: string;
  date: string;
  comment: string;
  serviceId: string;
  serviceName: string;
}