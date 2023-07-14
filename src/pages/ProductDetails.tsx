import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useSingleProductQuery } from '@/redux/api/apiSlice';
import { addToCart } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { IProduct } from '@/types/globalTypes';
import { JSXElementConstructor, Key, ReactElement, ReactFragment } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  //! Temporary code, should be replaced with redux
  
  const {data, isLoading} = useSingleProductQuery(id);

  //! Temporary code ends here

  const dispatch = useAppDispatch();
  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };

  if(isLoading) {
    return (
      <div>
        Loading
      </div>
    )
  }else{
    return (
      <>
        <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
          <div className="w-[50%]">
            <img src={data?.image} alt="" />
          </div>
          <div className="w-[50%] space-y-3">
            <h1 className="text-3xl font-semibold">{data?.name}</h1>
            <p className="text-xl">Rating: {data?.rating}</p>
            <ul className="space-y-1 text-lg">
              {data?.features?.map((feature: boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | Key | null | undefined, i: number) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <Button onClick={() => {handleAddProduct(data)}}>Add to cart</Button>
          </div>
        </div>
        <ProductReview id={id!} />
      </>
    );
  }

  
}
