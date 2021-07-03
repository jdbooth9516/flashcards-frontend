import React from 'react'
import useForm from '../../useForm'
import axios from 'axios';

const UpdateCard = () => {

    const { values, handleChange, handleSubmit } = useForm(() => {
        updateInfo(values)
    })

    function updateInfo(values) { 
        async function updateCardInDatabase(values) { 
            try { 
                const response = await axios.put("http://127.0.0.1:8000/cards_category/2/1/", values);
            } catch (error) { 
                alert('error')
                return
            }
            alert(`New card has been added to the Category`)
        }
        updateCardInDatabase(values);
    }

    return (
      <div className="form-container">
        <form onSubmit={handleSubmit}>
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

export default UpdateCard
