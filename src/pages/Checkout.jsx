import { useRef, useState } from 'react'
import { Navigate, NavLink, useNavigate, useParams, useSearchParams } from 'react-router'
const tshirtSizes = ["Small", "Medium", "Large", "X-Large"];
// List of available products (each one has its own image)
const products = [
  {
    id: 1,
    name: 'Great and Terrible T-Shirt Design',
    price: 80,
    sizes: tshirtSizes,
    image: "https://www.behance.net/gallery/173331423/Simple-Typography-T-Shirt-Design",
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
]

function Checkout() {
  // Read the product id from the URL: /items/1
  const { id } = useParams()

  // Read the size from the URL: ?size=9
  const [searchParams] = useSearchParams()
  const size = searchParams.get('size')

  // Lets us move to another page with code
  const navigate = useNavigate()

  // Find the product that matches the id in the URL
  const product = products.find((p) => p.id === Number(id))

  // How many pairs the user wants
  const [qty, setQty] = useState(1)

  // true after the user presses "Yes" (this shows the success alert)
  const [confirmed, setConfirmed] = useState(false)

  // A reference to the pop up, so we can open/close it with code
  const dialogRef = useRef(null)

  // Read the info saved from the Info page ONCE, when the page loads.
  // Doing it with useState means clearing sessionStorage later
  // will not trigger the redirect below.
  const [info] = useState(() => {
    const saved = sessionStorage.getItem('customerInfo')
    return saved ? JSON.parse(saved) : null
  })

  // If the user skipped the Info page, send them back to fill it in
  if (!info) {
    return <Navigate to="/info" replace />
  }

  // If the product id in the URL doesn't exist, show a message
  if (!product) {
    return (
      <div className="p-8 text-center">
        <p>Product not found.</p>
        <NavLink to="/items" className="btn mt-4">Back to Items</NavLink>
      </div>
    )
  }

  // Price x quantity
  const total = product.price * qty

  // YES: close the pop up and show the success alert
  function handleYes() {
    dialogRef.current.close()
    setConfirmed(true)
  }

  // NO: just close the pop up (cancel the purchase)
  function handleNo() {
    dialogRef.current.close()
  }

  // OK (on the alert): clear the saved info and go back to Home
  function handleOk() {
    sessionStorage.removeItem('customerInfo')
    navigate('/')
  }

  return (
    <div className="max-w-md mx-auto my-8 flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* Success alert: only appears after the user presses "Yes" */}
      {confirmed && (
        <div role="alert" className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Your purchase has been confirmed!</span>
          {/* Pressing OK takes the user to Home */}
          <button type="button" className="btn btn-sm" onClick={handleOk}>
            OK
          </button>
        </div>
      )}

      {/* Product details + quantity */}
      <div className="card bg-base-200 p-4">
        <div className="flex items-center gap-4">
          {/* The picture changes based on the product that was bought */}
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <h2 className="font-semibold">{product.name}</h2>
            {size && <p className="text-sm">Size (US): {size}</p>}
            <p>${product.price}</p>
          </div>
        </div>

        <label className="mt-4 flex items-center gap-3">
          Quantity
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="input w-24"
            disabled={confirmed} // can't change after confirming
          />
        </label>

        <p className="mt-3 text-lg font-bold">Total: ${total}</p>
      </div>

      {/* Customer info (comes from the Info page) */}
      <div className="card bg-base-200 p-4">
        <h2 className="font-semibold mb-2">Your Information</h2>
        <div className="flex flex-col gap-1 text-sm">
          <p>Name: {info.firstName} {info.lastName}</p>
          <p>Address: {info.address}</p>
          <p>Contact: {info.contact}</p>
        </div>

        {/* Hidden after confirming so the info can't be changed */}
        {!confirmed && (
          <NavLink to="/info" className="btn btn-ghost btn-sm mt-3 self-start">
            Edit info
          </NavLink>
        )}
      </div>

      {/* Place order button: hidden after confirming so it can't be clicked twice */}
      {!confirmed && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => dialogRef.current.showModal()} // opens the confirmation pop up
        >
          Place order
        </button>
      )}

      {/* Confirmation pop up: "Are you sure?" */}
      <dialog
        ref={dialogRef}
        className="modal modal-bottom sm:modal-middle"
        onCancel={handleNo} // pressing Esc counts as "No"
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Are you sure with your purchase?</h3>

          {/* Order summary */}
          <div className="flex flex-col gap-1 py-3 text-sm">
            <p>
              Item: {product.name}
              {size && ` (size ${size})`} x {qty}
            </p>
            <p>Total: ${total}</p>
            <p>Name: {info.firstName} {info.lastName}</p>
            <p>Address: {info.address}</p>
            <p>Contact: {info.contact}</p>
          </div>

          <div className="modal-action">
            {/* No = cancel */}
            <button type="button" className="btn" onClick={handleNo}>
              No
            </button>
            {/* Yes = confirm and show the success alert */}
            <button type="button" className="btn btn-primary" onClick={handleYes}>
              Yes
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Checkout