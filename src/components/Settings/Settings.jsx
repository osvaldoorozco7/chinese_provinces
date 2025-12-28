import { useState } from 'react'
import './Settings.css'
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    
    const navigate = useNavigate();
    const [mode, setMode] = useState("hanzi");

    const goToPage = (page) => {
        switch (page) {
            case "":
                navigate("/")
                break;
            case "map":
                navigate("/map", {
                    state: {mode}
                });
        }
    };

    console.log(mode)

    return(

        <div className='settings-main-container'>

            <div className='settings-content'>

                <div className='back-arrow' onClick={() => goToPage('')}>
                    <img src="/Images/arrow-back.svg" alt="" />
                </div>
                

                <h2>Mode</h2>

                <div className='mode-container'>
                    <form className='mode-form'>
                        <label>
                            <input type="radio"
                                    name='learningMode'
                                    id='hanzi' 
                                    value="hanzi" 
                                    checked={mode==='hanzi'} 
                                    onChange={(e) => setMode(e.target.value)}/>
                            汉字
                        </label>
                        
                        <label>
                            <input type="radio"
                                    name='learningMode'
                                    id="pinyin" 
                                    value="pinyin" 
                                    checked={mode==='pinyin'}
                                    onChange={(e) => setMode(e.target.value)}/>
                            Pinyin
                        </label>
                        
                        <label>
                            <input type="radio"
                                    name='LearningMode'
                                    id='both'
                                    value="both"
                                    checked={mode==='both'}
                                    onChange={(e) => setMode(e.target.value)}/>
                            汉字 + Pinyin
                        </label>
                    </form>
                </div>

                <button className='settings-button' onClick={() => goToPage('map')}> Let's go!</button>
            </div>

            <Footer/>
        </div>
    );
};


export default Settings;