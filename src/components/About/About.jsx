import './About.css';

export function About() {
    return (
        <div className='ab-container'>
            <div className='ab-content'>
                <h1 className='ab-title'>Equipo de Desarrollo</h1>
                <div className='ab-images'>
                    <figure className='ab-figure'>
                        <img src='/img/nosotros/max.png' alt='Max' className='ab-img' />
                        <figcaption className='ab-caption'>Maximiliano Cabrera</figcaption>
                    </figure>
                    <figure className='ab-figure'>
                        <img src='/img/nosotros/dela.png' alt='Dela' className='ab-img' />
                        <figcaption className='ab-caption'>Matias De la Cuadra</figcaption>
                    </figure>
                    <figure className='ab-figure'>
                        <img src='/img/nosotros/chiki.png' alt='Chiki' className='ab-img' />
                        <figcaption className='ab-caption'>Matias Oliva</figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
}

