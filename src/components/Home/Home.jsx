import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Footer from '../Footer/Footer';

const Home = () => {
    
const navigate = useNavigate();

    const goToMap = () => {
        navigate('/settings');
    };

    return (
        <div className="home-container">
            <div className='home-map-container'>
                <img src="/Images/China_blank_province_map.svg.png" alt="" />
            </div>

            <h1>欢迎光临</h1>
            
            <div className='home-text'>
                <p>
                    Master China's Geography with Mandarin Flashcards discover China's 34 provinces, municipalities, and autonomous regions through an intelligent flashcard system designed for language learners and geography enthusiasts alike.
                    
                    <h2>Customize Your Learning Experience</h2>
                    <ul className='home-list-style'>
                        <li>Hanzi Mode: Learn province names in authentic Chinese characters </li>
                        <li>Pinyin Mode: Master pronunciation with phonetic transcriptions</li>
                        <li>Dual Mode: Challenge yourself with both characters and pronunciation simultaneously</li>
                    </ul>

                </p>

                <h2>Key features
                    
                </h2>
                <ul className='home-list-style'>
                    <li>Interactive flashcards with spaced repetition algorithm</li>
                    <li>Detailed province profiles including capitals and regions</li>
                    <li>Progress tracking with performance analytics</li>
                    <li>Clean, intuitive interface optimized for daily practice</li>

                </ul>
            </div>

            <button className='home-button' onClick={goToMap}>Go to learn!</button>

            <Footer/>
        </div>
    );
};


export default Home;
