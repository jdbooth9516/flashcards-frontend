import axios from 'axios';
import React from 'react'
import useForm from '../../useForm'
import UpdateCount from '../UpdateCount/UpdateCount';

const CreateCard = (props) => {
    const { values, handleChange, handleSubmit} = useForm(() => {created(values)});


    function created(values) {
      async function addCardToDatabase(values) {
        try {
        console.log(values);
        const response = await axios.post("http://127.0.0.1:8000/cards/", values);
        console.log(props.categories[values.category - 1 ]);
        UpdateCount(props.categories[values.category - 1]); 
        
      } catch (error) {
        alert(error)
        return
      }
      alert(`New card has been add to the Category`)
    };
      addCardToDatabase(values);
      props.hideCreate()
    }

    return (
      //maybe make this in to a modal
      <div className="form-container">
        <div>
            <ul>
                <p>for category please choose a number for the category that you want</p>
                {props.categories.map((category)=> (
                    <li>{category.id}: {category.name}</li>
                    )             
                )}
            </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <input 
                type="number"
                name="category" 
                onChange={handleChange}
                value={values.category}
                required={true}  
            />
          </label>
          <label>
            Question:
            <input
              type="text"
              name="question"
              onChange={handleChange}
              value={values.question}
              required={true}
            />
          </label>
          <label>
            Answer:
            <input
              type="text"
              name="answer"
              onChange={handleChange}
              value={values.answer}
              required={true}
            />
          </label>
          <button type="submit">Create Card</button>
        </form>
      </div>
    );
}

export default CreateCard
