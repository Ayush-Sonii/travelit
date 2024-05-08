import Image from "next/image"


export default function about(){
  return (
    <>
    {/* <div className="abWrapper flex flex-wrap mx-3 my-2 mt-5 items-centre justify-around snap-x snap-mandatory">
      <div className="c1 flex flex-col bg-white shadow-md mx-1 my-1 p-3 snap-always snap-center">
        <Image
          src="/images/city-palace-jaipur.jpg"
          width={300}
          height={300}
          alt="Picture of the author"
          className="rounded-md"
        />
        <p className="text-sm text-slate-500 p-2">
          The beauty of jaipur.
        </p>
      </div>
      <div className="c1 flex flex-col bg-white shadow-md mx-1 my-1 p-3 snap-always snap-center">
        <Image
          src="/images/city-palace-jaipur.jpg"
          width={300}
          height={300}
          alt="Picture of the author"
          className="rounded-md"
        />
        <p className="text-sm text-slate-500 p-2">
          The beauty of jaipur.
        </p>
      </div>
      <div className="c1 flex flex-col bg-white shadow-md mx-1 my-1 p-3 snap-always snap-center">
        <Image
          src="/images/city-palace-jaipur.jpg"
          width={300}
          height={300}
          alt="Picture of the author"
          className="rounded-md"
        />
        <p className="text-sm text-slate-500 p-2">
          The beauty of jaipur.
        </p>
      </div>
      <div className="c1 flex flex-col bg-white shadow-md mx-1 my-1 p-3 snap-always snap-center">
        <Image
          src="/images/city-palace-jaipur.jpg"
          width={300}
          height={300}
          alt="Picture of the author"
          className="rounded-md"
        />
        <p className="text-sm text-slate-500 p-2">
          The beauty of jaipur.
        </p>
      </div>
      <div className="c1 flex flex-col bg-white shadow-md mx-1 my-1 p-3 snap-always snap-center">
        <Image
          src="/images/city-palace-jaipur.jpg"
          width={300}
          height={300}
          alt="Picture of the author"
          className="rounded-md"
        />
        <p className="text-sm text-slate-500 p-2">
          The beauty of jaipur.
        </p>
      </div>
      <div className="c1 flex flex-col bg-white shadow-md mx-1 my-1 p-3 snap-always snap-center">
        <Image
          src="/images/city-palace-jaipur.jpg"
          width={300}
          height={300}
          alt="Picture of the author"
          className="rounded-md"
        />
        <p className="text-sm text-slate-500 p-2">
          The beauty of jaipur.
        </p>
      </div>
      <div className="c1 flex flex-col bg-white shadow-md mx-1 my-1 p-3 snap-always snap-center">
        <Image
          src="/images/city-palace-jaipur.jpg"
          width={300}
          height={300}
          alt="Picture of the author"
          className="rounded-md"
        />
        <p className="text-sm text-slate-500 p-2">
          The beauty of jaipur.
        </p>
      </div>
    </div> */}
    <div 
    className="flex flex-col bg-white m-auto p-auto mt-10 animate-fade">
    <h1
        className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-600 text-center justify-center"
      >
        Featured Cities
      </h1>
      <div className="flex justify-center" ><div className="flex mb-3 p-0 border-2 border-orange-600 w-1/3 "></div></div>
      <div
        className="flex overflow-x-scroll pb-10 hide-scroll-bar"
      >
        <div
          className="flex flex-nowrap lg:mx-40 md:mx-20 mx-10 "
        >
          <div className="inline-block px-3">
          <div
              className="w-96 cursor-pointer h-80 max-w-sm overflow-hidden p-5 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <Image
                src="/images/city-palace-jaipur.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="rounded-md"
              />
              <p className="text-sm text-slate-500 p-2">
                The beauty of jaipur.
              </p>
            </div>
          </div>
          <div className="inline-block px-3">
            <div
              className="w-96 cursor-pointer h-80 max-w-sm overflow-hidden p-5 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <Image
                src="/images/manali.jpeg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="rounded-md"
              />
              <p className="text-sm text-slate-500 p-2">
                The beauty of Manali.
              </p>
            </div>
          </div>
          <div className="inline-block px-3">
            <div
              className="w-96 cursor-pointer h-80 max-w-sm overflow-hidden p-5 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <Image
                src="/images/agra.jpeg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="rounded-md"
              />
              <p className="text-sm text-slate-500 p-2">
                The beauty of Agra.
              </p>
            </div>
          </div>
          <div className="inline-block px-3">
            <div
              className="w-96 cursor-pointer h-80 max-w-sm overflow-hidden p-5 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <Image
                src="/images/jaisalmer.jpeg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="rounded-md"
              />
              <p className="text-sm text-slate-500 p-2">
                The beauty of jaisalmer.
              </p>
            </div>
          </div>
          <div className="inline-block px-3">
            <div
              className="w-96 cursor-pointer h-80 max-w-sm overflow-hidden p-5 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <Image
                src="/images/delhi.jpeg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="rounded-md"
              />
              <p className="text-sm text-slate-500 p-2">
                The beauty of Delhi.
              </p>
            </div>
          </div>
          <div className="inline-block px-3">
            <div
              className="w-96 cursor-pointer h-80 max-w-sm overflow-hidden p-5 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <Image
                src="/images/kashmir.jpeg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="rounded-md"
              />
              <p className="text-sm text-slate-500 p-2">
                The beauty of Kashmir.
              </p>
            </div>
          </div>
          <div className="inline-block px-3">
            <div
              className="w-96 cursor-pointer h-80 max-w-sm overflow-hidden p-5 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <Image
                src="/images/tamil_nadu.jpeg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="rounded-md"
              />
              <p className="text-sm text-slate-500 p-2">
                The beauty of Tamil Nadu.
              </p>
            </div>
          </div>
          <div className="inline-block px-3">
            <div
              className="w-96 cursor-pointer h-80 max-w-sm overflow-hidden p-5 rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <Image
                src="/images/mp.jpeg"
                width={500}
                height={500}
                alt="Picture of the author"
                className="rounded-md"
              />
              <p className="text-sm text-slate-500 p-2">
                The beauty of Madhya Pradesh.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n.hide-scroll-bar {\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n}\n.hide-scroll-bar::-webkit-scrollbar {\n  display: none;\n}\n"
        }}
/>

    </>
  )
}
