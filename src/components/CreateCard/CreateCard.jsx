import axios from 'axios';
import React, {useState} from 'react'
import ReactModal from 'react-modal'
import useForm from '../../useForm'
import UpdateCount from '../UpdateCount/UpdateCount';
import "./CreateCard.css"

const CreateCard = (props) => {
    const { values, handleChange, handleSubmit} = useForm(() => {created(values)});
    const [open , setOpen] = useState(false) 

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
    };
      addCardToDatabase(values);
      setOpen(false);
      props.hideCreate();
    }

    //Modal control 
    

    return (
      //maybe make this in to a modal
      <div>
        <button className="CC-btn" onClick={() => setOpen(true)}>
          Create Card
        </button>
      <ReactModal 
        isOpen={open}
        className="Modal"
        overlayClassName="Overlay"
        >
      <div className="createcard-container">
            <button className='del-btn modal-btn' onClick={() => setOpen(false)}>X</button>
        <div>
            <h3 className='title' id="simple-modal-title"> Create New Card</h3>
            <p className='description' id="simple-modal-description">for category please choose a number for the category that you want</p>

            <ul className="list">
                {props.categories.map((category)=> (
                    <li>{category.id}: {category.name}</li>
                    )             
                )}
            </ul>
        </div>
        <form onSubmit={handleSubmit} className="create-form">
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
          <button className="create-submit" type="submit">Create Card</button>
        </form>
      </div>
      </ReactModal>
      </div>
    );
}

export default CreateCard
