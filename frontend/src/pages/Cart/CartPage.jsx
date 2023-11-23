import React from "react";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import Layout from "../../components/layout/Layout";
import "/src/assets/css/cart.css";
import { useNavigate } from "react-router-dom";


const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <Layout>
      <div className="card mt-28">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="title mb-10">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Bag</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted text-sm font-bold text-[#6c757d]">
                  {cart?.length}
                  <span className="pl-1 ">items</span>
                </div>
              </div>
            </div>

            <div className="row border-top overflow-y-scroll h-80">
              {cart?.map((p) => (
                <div className="row main align-items-center border-b border-solid border-[#dee2e6]">
                  <button
                    onClick={() => {
                      removeCartItem(p._id);
                    }}
                  >
                    <span className="close text-end pr-4">✕</span>
                  </button>
                  <div className="col-2">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className=" cursor-pointer"
                      alt={p.name}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    />
                  </div>
                  <div className="col">
                    <div className="row  text-sm font-bold text-[#6c757d]">
                      {p.name}
                    </div>
                    <div className="row  text-sm font-bold text-[#212529]">
                      $ {p.price}
                    </div>
                  </div>
                  <div className="col">
                    <a href="#" className="dash_a">
                      -
                    </a>
                    <a href="#" className="border">
                      1
                    </a>
                    <a href="#">+</a>
                  </div>
                  <div className="col">€ 44.00</div>
                </div>
              ))}
            </div>
            {/* <div className="row">
              <div className="row main align-items-center">
                <div className="col-2">
                  <img
                    className="img-fluid cart_image"
                    src="https://i.imgur.com/ba3tvGm.jpg"
                  />
                </div>
                <div className="col">
                  <div className="row text-muted">Shirt</div>
                  <div className="row">Cotton T-shirt</div>
                </div>
                <div className="col">
                  <a href="#">-</a>
                  <a href="#" className="border">
                    1
                  </a>
                  <a href="#">+</a>
                </div>
                <div className="col">
                  € 44.00 <span className="close">✕</span>
                </div>
              </div>
            </div>
            <div className="row border-top border-bottom">
              <div className="row main align-items-center">
                <div className="col-2">
                  <img
                    className="img-fluid"
                    src="https://i.imgur.com/pHQ3xT3.jpg"
                  />
                </div>
                <div className="col">
                  <div className="row text-muted">Shirt</div>
                  <div className="row">Cotton T-shirt</div>
                </div>
                <div className="col">
                  <a href="#">-</a>
                  <a href="#" className="border">
                    1
                  </a>
                  <a href="#">+</a>
                </div>
                <div className="col">
                  € 44.00 <span className="close">✕</span>
                </div>
              </div>
            </div> */}

            <div className="back-to-shop">
              <a href="#">←</a>
              <span className="text-muted">Back to shop</span>
            </div>
          </div>
          <div className="col-md-4 summary">
            <div className="border-b border-solid border-[#dee2e6] pb-4">
              <h5 className="summary_heading mt-8">
                <b>Summary</b>
              </h5>
            </div>
            <hr className="pt-4" />
            <div className="row">
              <div className="col pl-0 text-sm font-bold text-[#525252]">
                Order Value
              </div>
              <div className="col text-right">{totalPrice()}</div>
            </div>
            <form className="shipping_form flex">
              <div className="col pl-0 text-sm font-bold text-[#525252]">
                Delivery
              </div>
              <div className="col text-right">Free</div>
            </form>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col text-sm font-bold text-[#313131]">
                TOTAL PRICE
              </div>
              <div className="col text-right">{totalPrice()}</div>
            </div>
            <button onClick={() => navigate(`/checkout`)} className="btn">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
