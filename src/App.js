import {useState} from 'react';
import axios from 'axios';
import styled from "styled-components";

function App() {

    const [location, setLocation] = useState('');
    const [result, setResult] = useState({});
    const key = '3d69b4c4a03d811c2514b209e56168ce';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    const onClick = async (e) => {
        if(e.key === 'Enter'){
            try {
                const data = await axios({
                    method: 'get',
                    url: url,
                })
                console.log(data);
                setResult(data);
            } catch (error){
                alert(error);
            }
        }
    }
            return (
                <AppWrap>
                    <div className="appContentWrap">
                        <input placeholder="도시를 입력하세요" value={location}
                               onChange={(e) => setLocation(e.target.value)}
                               type='text'
                               onKeyDown={onClick}/><br/>
                        {
                            Object.keys(result).length !== 0 && (
                                <ResultWrap>
                                    {formattedDate}
                                    <div className="city">{result.data.name}</div>
                                    <div className="temperature">
                                        현제온도:{Math.round(((result.data.main.temp - 273.15) * 10)) / 10}º<br/>
                                    </div>
                                    <div className="temperature">
                                        최고:{Math.round(((result.data.main.temp_max - 273.15) * 10)) / 10}º
                                        최저:{Math.round(((result.data.main.temp_min - 273.15) * 10)) / 10}º
                                        <br/>
                                        {result.data.weather[0].main}
                                    </div>
                                    <div className="sky">
                                        <img src={`https://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`}
                                              alt={''}/>
                                    </div>
                                </ResultWrap>
                            )
                        }
                    </div>
                </AppWrap>
            );
}

export default App;

const AppWrap = styled.div`
    width: 100vw;
    height: 100vh;

  .appContentWrap {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 20px;
  }

  input {
    padding: 16px;
    border: 2px black solid;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 100px;
  padding: 10px;
  border: 1px black solid;
  border-radius: 8px;

  .city {
    font-size: 24px;
  }

  .temperature {
    font-size: 24px;
    margin-top: 8px;
  }

  .sky {
      font-size: 24px;
      width: 10vw;
      height: 10vh;
  }
`;