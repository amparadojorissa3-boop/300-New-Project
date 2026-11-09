import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
const tshirtSizes = ["Small", "Medium", "Large", "X-Large"];
// 1. Data: a list of products (each one now has its own image)
const items = [
 {
    id: 1,
    name: 'Grat and Terrible T-Shirt Design',
    price: 80,
    sizes: tshirtSizes,
    image: "https://cdn.dribbble.com/userupload/8931336/file/original-52bf4650d8172c2d8b659fcb32fa3d81.jpg?resize=1504x1128&vertical=center",
  },
  {
    id: 2,
    name: 'Top of a Mountain T-Shirt Design',
    price: 50,
    sizes: tshirtSizes,
    image: "https://cdn.dribbble.com/userupload/8109168/file/original-6894f338bc260cd3443189d805b21154.jpg?resize=640x480&vertical=center",

  },
    {
    id: 3,
    name: "Life is Simple T-Shirt Design",
    price: 28.50,
    sizes: tshirtSizes,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFqCvjI3gzWBMuYp3BcFqrRdjdSfiV_QNGw3bbFQRHRWjZiwd0mS-LZNnq&s=10",
  },
];

export default function Items() {
  const navigate = useNavigate();

  // 2. State
  const [cart, setCart] = useState([]);                 // items in the cart
  const [pickedItem, setPickedItem] = useState(null);   // shoe shown in the pop up
  const [pickedSize, setPickedSize] = useState(null);   // size the user chose

  // 3. Add to Cart: open the pop up for this shoe
  function openPopup(item) {
    setPickedItem(item);
    setPickedSize(null);
  }

  // 4. Close the pop up
  function closePopup() {
    setPickedItem(null);
    setPickedSize(null);
  }

  // 5. Buy Now: save the shoe with its size, then go to its page
  function buyNow() {
    setCart([...cart, { ...pickedItem, size: pickedSize }]);
    navigate(`/items/${pickedItem.id}?size=${pickedSize}`);
    closePopup();
  }

  return (
    <div>
      <div className="flex justify-end p-6"></div>

      <div className="flex flex-wrap gap-6 justify-center p-6">
        {items.map((item) => (
          <div key={item.id} className="card w-96 bg-base-200 shadow-xl">
            <figure>
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="text-xl font-bold">${item.price}</p>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" onClick={() => openPopup(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 6. The pop up: only shows when a shoe was picked */}
      {pickedItem && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-bold">{pickedItem.name}</h3>
            <p className="py-2">Choose your size (US)</p>

            <div className="flex gap-2">
              {pickedItem.sizes.map((size) => (
                <button
                  key={size}
                  className={`btn ${pickedSize === size ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setPickedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="modal-action">
              <button className="btn" onClick={closePopup}>
                Cancel
              </button>
              {/* 7. Buy Now stays disabled until a size is chosen */}
              <button
                className="btn btn-primary"
                disabled={!pickedSize}
                onClick={buyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </dialog>
      )}

      <Outlet />
    </div>
  );
}