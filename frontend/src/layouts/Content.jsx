import { useState } from "react";

const images = [
  "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa3y3D8q5rD7wf4FKROOWwKSbzGDcRyXAJLCptGQk4lQQbNKOO7Wg.webp",
  "https://bualuang.fund/wp-content/uploads/2021/11/116067207_s-e1637144794148-620x380.jpg",
  "https://static.thairath.co.th/media/4DQpjUtzLUwmJZZPHZR7Ey7pJditGEcj8SNw7DpZ4ib5.jpg",
];

export default function Content() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className=" bg-gray-300 bg-opacity-10">
      {/* ----------------------------------------------------------------- */}
      {/* <div className="container mx-auto"> bg-current */}
      {/* <div className="flex container mx-auto w-full snap-x items-center gap-4 overflow-x-auto  rounded-lg bg-white p-4 bg-opacity-40">
        <div className="h-auto shrink-0 snap-center rounded-full">
          <img
            className="rounded-lg shadow-lg"
            src="https://static.thairath.co.th/media/4DQpjUtzLUwmJZZPHZR7Ey7pJditGEcj8SNw7DpZ4ib5.jpg"
            alt="img"
          />
        </div>
        <div className="h-auto shrink-0 snap-center rounded-full">
          <img
            className="rounded-lg shadow-lg"
            src="https://static.thairath.co.th/media/4DQpjUtzLUwmJZZPHZR7Ey7pJditGEcj8SNw7DpZ4ib5.jpg"
            alt="img"
          />
        </div>
        <div className="h-auto shrink-0 snap-center rounded-full">
          <img
            className="rounded-lg shadow-lg"
            src="https://static.thairath.co.th/media/4DQpjUtzLUwmJZZPHZR7Ey7pJditGEcj8SNw7DpZ4ib5.jpg"
            alt="img"
          />
        </div>
      </div> */}
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="relative w-full mx-auto h-full flex items-center justify-center">
          <div className="overflow-hidden rounded-lg shadow-lg w-screen h-full">
            <img
              src={images[currentIndex]}
              alt="carousel"
              className="w-full h-full" // object-center
            />
          </div>

          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full"
            onClick={prevSlide}
          >
            ❮
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full"
            onClick={nextSlide}
          >
            ❯
          </button>

          <div className="absolute bottom-4 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-green-600" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      <div className="container mx-auto text-center">
        <h2 className="text-4xl text-green-900 font-bold mb-4 pt-6">
          ประเภทพลาสติก
        </h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-40">
              <div className="mb-4">
                <img
                  src="https://www.cleanlink.com/resources/editorial/2023/29913-recycle-sstock-2103583127.jpg"
                  alt="Product 1"
                  className="w-full h-64 object-cover hover:scale-150 rounded-md transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl text-gray-400 font-bold mb-2">
                ขวดพลาสติก
              </h3>
              <p className="text-gray-300">รายละเอียด</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-40">
              <div className="mb-4">
                <img
                  src="https://waste-management-world.com/imager/media/wasteManagementWorld/809014/3520_428fd902f4247199467725e7eccf1673.jpg"
                  alt="Product 2"
                  className="w-full h-64 object-cover hover:scale-150 rounded-md transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl text-gray-400 font-bold mb-2">
                ถุงพลาสติก
              </h3>
              <p className="text-gray-300">รายละเอียด</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-40">
              <div className="mb-4">
                <img
                  src="https://hq2.recyclist.co/wp-content/uploads/sites/2/2015/02/cds-300x300.jpg"
                  alt="Product 3"
                  className="w-full h-64 object-cover hover:scale-150 rounded-md transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl text-gray-400 font-bold mb-2">
                แผ่นซีดี
              </h3>
              <p className="text-gray-300">รายละเอียด</p>
            </div>
          </div>
        </div>
        <h2 className="text-4xl text-green-900 font-bold mb-4 mt-4">
          ประเภทเหล็ก
        </h2>
        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-40">
              <div className="mb-4">
                <img
                  src="https://tiimg.tistatic.com/fp/1/007/482/-99-9-purity-waste-material-iron-scrap-for-industrial-use-recycling-with-selective-focus-016.jpg"
                  alt="Product 1"
                  className="w-full h-64 object-cover hover:scale-150 rounded-md transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl text-gray-400 font-bold mb-2">
                เหล็กรวม
              </h3>
              <p className="text-gray-300">รายละเอียด</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-40">
              <div className="mb-4">
                <img
                  src="https://www.nextlevelenergy.com/cdn/shop/articles/AluminumCanWaste.jpg?v=1708446445&width=1100"
                  alt="Product 2"
                  className="w-full h-64 object-cover hover:scale-150 rounded-md transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl text-gray-400 font-bold mb-2">
                กระป๋องสังกะสี
              </h3>
              <p className="text-gray-300">รายละเอียด</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-40">
              <div className="mb-4">
                <img
                  src="https://images.ctfassets.net/b482wvamo5jo/5bSzifSGSuTDLmZ6xqzBF6/b03d6e811e2f8cf270765bb0b8ad0d05/_5f988541-1d98-4c0f-aabb-91862186b620.jpeg"
                  alt="Product 3"
                  className="w-full h-64 object-cover hover:scale-150 rounded-md transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl text-gray-400 font-bold mb-2">
                สังกะสีแผ่น
              </h3>
              <p className="text-gray-300">รายละเอียด</p>
            </div>
          </div>
        </div>
        <h2 className="text-4xl text-green-900 font-bold mb-4 mt-4">
          ประเภทกระดาษ
        </h2>
        <div className="flex flex-wrap justify-center mb-6">
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-40">
              <div className="mb-4">
                <img
                  src="https://media.istockphoto.com/id/681198734/photo/waste-paper-is-collected-and-packed-for-recycling-cardboard-and-paper-recycling.jpg?s=612x612&w=0&k=20&c=Njr1e0wYvQbKEjY2ZLiODhuAVpng6BqGyIRhOiC1s6s="
                  alt="Product 1"
                  className="w-full h-64 object-cover hover:scale-150 rounded-md transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl text-gray-400 font-bold mb-2">
                กระดาษลัง
              </h3>
              <p className="text-gray-300">รายละเอียด</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-40">
              <div className="mb-4">
                <img
                  src="https://cleanstreets.westminster.gov.uk/hubfs/Imported_Blog_Media/shutterstock_474668344-1.jpg#keepProtocol"
                  alt="Product 2"
                  className="w-full h-64 object-cover hover:scale-150 rounded-md transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl text-gray-400 font-bold mb-2">
                กระดาษขาวดำ
              </h3>
              <p className="text-gray-300">รายละเอียด</p>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg bg-opacity-40">
              <div className="mb-4">
                <img
                  src="https://www.rubicon.com/wp-content/uploads/2022/01/newspaper-bundles-for-paper-recycling.jpg"
                  alt="Product 3"
                  className="w-full h-64 object-cover hover:scale-150 rounded-md transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl text-gray-400 font-bold mb-2">
                หนังสือพิมพ์
              </h3>
              <p className="text-gray-300">รายละเอียด</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
