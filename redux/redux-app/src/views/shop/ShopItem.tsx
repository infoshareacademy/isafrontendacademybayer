import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Product, createAddToCartAction, createRemoveFromCartAction } from "../../state/shop-cart";
import { isProductInCartSelector } from "../../state/shop-cart.selectors";

export const ShopItem: FC<{ product: Product }> = ({ product }) => {
    const dispatch = useDispatch();
    const isProductInCart = useSelector(isProductInCartSelector(product.id));

    const handleAdd = () => {
        dispatch(createAddToCartAction(product))
    }

    const handleRemove = () => {
        dispatch(createRemoveFromCartAction(product.id))
    }

    return <Card style={{ width: '25%', display: 'inline-block' }}>
        <Card.Img variant="top" src={product.url} />
        <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.price}</Card.Text>
            {
                isProductInCart
                    ? <Button variant="danger" onClick={handleRemove}>Remove from cart</Button>
                    : <Button variant="primary" onClick={handleAdd}>Add to cart</Button>
            }
        </Card.Body>
    </Card>
}