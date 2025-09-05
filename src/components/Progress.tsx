export default function Progress({ percentage }: { percentage: number }) {
  return (
    <div className="flex items-center gap-5">
      <div className="w-full bg-primary/30 rounded-full h-2.5 flex items-center relative">
        <div
          className="h-5 w-5 bg-white border-2 border-primary absolute rounded-full duration-[600ms] max-sm:-ml-1"
          style={{ left: `${percentage - 2}%` }}
        ></div>
        <div
          className="bg-primary h-2.5 rounded-full  duration-[600ms]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="p-2 border border-text bg-[#ffffff14] rounded-md ">
        <p className="text-xs text-text text-center w-[40px]">
          {Math.round(percentage)}%
        </p>
      </div>
    </div>
  );
}
