import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../components/PictureCarousel/Carousel';
import german from '../German JSON.json';


function DetailPage(props) {
    const [pokeData, setPokeData] = useState();
    const params = useParams();
    let name;


    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}/`)
            .then(response => response.json())
            .then((pokeData) => {
                setPokeData(pokeData);
            });
    }, []);

    if (pokeData === undefined) {
        return;
    }

    if (pokeData.id <= 905 && props.language === "German") {
        console.log(pokeData.id);
        name = german[pokeData.id - 1].name;
    } else if (pokeData.id <= 905 && props.language === "English") {
        name = pokeData.name;
    }

    return (
        <section>
            <article className='imgArticle'>
                <img alt="PokeImg" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeData.id}.png`}></img>
                <h1 className='types-idName'>{("000" + (pokeData.id)).slice(-3) + "#"} {name}</h1>
                <p></p>
                <section className='pokeTypes'>{pokeData?.types.map((item) => {
                    return (
                        <div id='Q' className={`${item.type.name}`}> {item.type.name.toUpperCase()}</div>
                    );
                })}</section>
            </article>
            <article>
                <h2 className='types'> ABILITY</h2>
                <section className='ability'>{pokeData?.abilities.map((item) => {
                    return (

                        <div id='Z'>{item.ability.name.toUpperCase()}</div>

                    );
                })}</section>
            </article>

            <article className='carroussel-article'>
                <h2 className='types'>More Pictures</h2>
                <Carousel data={pokeData} />

            </article>
        </section>
    );
};

export default DetailPage;