export default function Banner() {
  return (
    <div className="flex flex-row flex-nowrap w-screen h-20">
      <div className="bg-white w-1/2 flex flex-row flex-wrap justify-between px-4">
        <a href="https://mmonai.co/" target="_blank">
          <h1 className="font-title text-3xl">
            <span className="text-ant">.co</span>
            <br />
            &nbsp;&nbsp;&nbsp;mmonAI
          </h1>
        </a>
        <h1 className="font-title text-3xl">.common</h1>
      </div>
      <div className="bg-ant w-1/2 px-4">
        <h1 className="font-title text-3xl">
          solution market
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <em className="text-white">proposals</em>
        </h1>
      </div>
    </div>
  );
}
