export function Product({
  productName,
  price,
  boughtDate,
}: {
  productName: string;
  price: number;
  boughtDate: string;
}) {
  return (
    <div className="border-cyan-400 border-2 rounded-md p-3 m-5">
      <div className="font-bold text-lg">{productName}</div>
      <div>{price}원</div>
      <div>{new Date(boughtDate).toLocaleTimeString()}</div>
    </div>
  );
}
