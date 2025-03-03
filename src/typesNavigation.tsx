export type RootStackParamList = {
    Home: undefined;
    ProductDetails: { item: Product };
  };
  
  export interface Product {
    id: number;
    title: string;
    body: string;
  }
  