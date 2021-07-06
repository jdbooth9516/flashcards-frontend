import React from 'react'
import useForm from '../../useForm'
import axios from 'axios';
import "./UpdateCard.css";


const UpdateCard = (props) => {

    const { values, handleChange, handleSubmit } = useForm(() => {
        updateInfo(values)
    })

    function updateInfo(values) { 
        async function updateCardInDatabase(values) { 
            try { 
                const response = await axios.put(`http://127.0.0.1:8000/cards_category/${props.categoryId}/${props.cardId}/`, values);
            } catch (error) { 
                alert(error)
                return
            }
            alert(` card has updated`)
        }
        updateCardInDatabase(values);
        window.location.reload()
    }

    return (
      <div>
        <form className="form-container"onSubmit={handleSubmit}>
        <label style={{display: 'none'}}>
            Category:
            <input
              type="text"
              name="category"
              onChange={handleChange}
              value={values.category = props.categoryId}
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
              className="edit-form"
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
              className="edit-form"
            />
          </label>
  
          <button className='edit-form-btn' type="submit">Update Card</button>
        </form>
      </div>
    );
}

export default UpdateCard
