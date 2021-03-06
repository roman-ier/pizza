import React from 'react';
import Categories from "./Home/Categories";
import SortPopup from "./Home/Sortpoup";
import PizzaBlockIndex from "./Home/PizzaBlock/PizzaBlock(index)";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../../redux/actions/filterAC";
import {fetchPizzas} from "../../redux/actions/pizzasAC";
import LoadingBlock from "./Home/PizzaBlock/LoadingBlock";

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль',
    'Острые', 'Закрытые'];
const sortItems = [
    {name: 'популярности', type: 'rating', order: 'desc'},
    {name: 'цене', type: 'price', order: 'desc'},
    {name: 'алфавиту', type: 'name', order: 'asc'},
]

const Home = () => {
    const items = useSelector(({pizzas}) => pizzas.items);
    const cartItems = useSelector(({cart}) => cart.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
    const {category, sortBy} = useSelector(({filter}) => filter);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category))
    }, [sortBy, category]);
    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);
    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddPizzaToCart = (obj) => {
        dispatch({
            type: 'ADD_PIZZA_CART',
            payload: obj,
        });
    }


    return (<div className="container">
            <div className="content__top">
                <Categories activeCategory={category} onClickCategory={onSelectCategory} items={categoryNames}/>
                <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded ?
                    items.map((obj) => <PizzaBlockIndex
                        onClickAddPizza={handleAddPizzaToCart}
                        addedCount={cartItems[obj.id] && cartItems[obj.id].length}
                        isLoading={true}
                        {...obj}/>)
                    : Array(8).fill(0).map((_, index) => <LoadingBlock key={index}/>)}
            </div>
        </div>

    )
}
export default Home;