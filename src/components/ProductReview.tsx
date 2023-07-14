import { ChangeEvent, FormEvent, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useCommentPostMutation, useGetsCommentQuery } from '@/redux/api/apiSlice';



interface IProps {
  id: string;
}

export default function ProductReview({ id }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [commentPost, {isError}] = useCommentPostMutation();
  const {data, isLoading} = useGetsCommentQuery(id)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options = {
      id: id,
      data : {comment: inputValue}
    }
    
    commentPost(options);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  if(isLoading){
    <div>Loading</div>
  }else{
    return (
      <div className="max-w-7xl mx-auto mt-5">
        <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
          <Textarea
            className="min-h-[30px]"
            onChange={handleChange}
            value={inputValue}
          />
          <Button
            type="submit"
            className="rounded-full h-10 w-10 p-2 text-[25px]"
          >
            <FiSend />
          </Button>
        </form>
        <div className="mt-10">
          {data?.comments?.map((comment: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined, index: Key | null | undefined) => (
            <div key={index} className="flex gap-3 items-center mb-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
}