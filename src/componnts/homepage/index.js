import { useEffect, useState } from "react";
import ApiRequest from "../../functions/apiRequest/index"
import styles from "./style.module.css";


function HomePage (){
const [arr, setArr] = useState([]);   
const [searchQuery, setSearchQuery] = useState('');    
const [count, setCount] = useState(0);    
let data={data:searchQuery}

const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
};
  
const writeFile=()=>{
    console.log(searchQuery);
    ApiRequest("/", "post",data).then((data) => {
        setCount(count+1);
        console.log(data);
      })
      .catch((err) => {
        console.log("err=", err);
      });
}
const SearchFile=()=>{
    ApiRequest("/search", "post",data).then((data) => {
        setArr(data)
        setCount(count+1);
        console.log(data,count);
      })
      .catch((err) => {
        console.log("err=", err);
      });
}


    useEffect(() => {
        ApiRequest("/", "GET", null)
          .then((data) => {
            setArr(data);
            console.log(arr);
          })
          .catch((err) => {
            console.log("err=", err);
          });
      }, [count]);

      return (
        <div className={styles.container}> {/* Apply the container class */}
        <h1>Search content</h1>
        <input
          type="text"
          placeholder="Enter your search query"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={SearchFile}>Search</button>
        <br/>
        <button onClick={writeFile}>Add Content</button>
        {arr && (
          <div className={styles.result}> {/* Apply the result class */}
            <h2>Search Result:</h2>
            {arr.map((item,index)=>{
                return (<h1 className={index}>{item.data}</h1>)
            }

            )}
          </div>
        )}
      </div>
    );
}

export default HomePage;

