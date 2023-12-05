"use client";

import { getOrder } from "@/lib/api/orders";
import React, { useEffect, useState } from "react";
import  ProductReel  from "../../components/ProductReel";

const MyOrder = ({ params: { orderId } }) => {
  const [order, setOrder] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      const response = await getOrder(orderId);
      setOrder(response);
    };

    if (orderId) [getData()];
  }, [orderId]);

  return (
    <div>
      {order && (
        <div className="px-10 py-10 ">
          <h2 className="mb-10 text-3xl text-amazon-dark">
            <strong>Order Summary</strong>
          </h2>

          <div className="flex gap-10">
            <div className="w-3/4">
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                  {order.products.map((product) => (
                    <ProductReel key={product.id} productData={product} />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 p-10 h-max">
              <div>
                Order Total: <strong> ${order.price}</strong>
              </div>
              <div>
                Paymemt Method:
                <strong>
                  {order.status.paymentMode === "stripe"
                    ? " Stripe"
                    : " Cash on Delivery"}
                </strong>
              </div>
              <div>
                Payment Status:
                <strong>
                  {order.paymentStatus ? " Completed" : " Pending"}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
