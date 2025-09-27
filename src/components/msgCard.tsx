interface CardProps{
	text: string,
	by: "others" | "me",
}

const CardStyleOuter = {
  me: "justify-end",
  others: "justify-start",
  system: "justify-center",
};
const CardStyleInner = {
  me: "bg-[#fefefe] border border-[#fefefe] text-[#0a0a0a] font-medium rounded-bl-xl",
  others: "bg-[#0f0f0f] border border-[#31313198] text-[#fefefe] rounded-br-xl",
  system: "border border-[#31313198] text-[#fefefe] rounded-b-xl px-4 py-2",
};

const MsgCard = ({ text, by }: CardProps) => {	
	return (
    <div className={`flex items-center w-full px-2 py-1 ${CardStyleOuter[by]}`}>
      <span
        className={`font-geist text-sm tracking-tight leading-4 px-2 py-1 rounded-t-xl max-w-90 ${CardStyleInner[by]}`}
      >
        {text}
      </span>
    </div>
  );
}

export default MsgCard;
