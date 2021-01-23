import { idbPromise } from "../utils/helpers";
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_ORDER } from "../utils/mutations";
import Jumbotron from "../components/Jumbotron";

const Success = () => {

    console.log("I am in success");
    console.log()

    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            console.log("cartie cartie ");
            console.log(cart);
            const products = cart.map(item => item._id);
            if (products.length) {
                const { data } = await addOrder({ variables: { products } });
                console.log("priduct id");
                console.log(data);
                const productData = data.addOrder.products;
                console.log("priduct id 2");
                console.log(productData);

                productData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
            }
        }

        saveOrder();
    }, [addOrder]);

    setTimeout(() => {
        window.location.assign("/");
    }, 3000);

    return (
        <div>
            <Jumbotron>
                <h1>Success!</h1>
                <h2>
                    Thank you for your purchase!
          </h2>
                <h2>
                    You will now be redirected to the homepage
          </h2>
            </Jumbotron>
        </div>
    );
};

export default Success;



