import axios from 'axios'
import React from 'react'
import useForm from '../../useForm'

export const CreateCategory = () => {

    const {values, handleChange, handleSubmit} = useForm(() => {createCat(values)})
    console.log(values);

    function createCat(values) { 
        async function addCatToDatabase(values) { 
            try { 
                const response = await axios.post("http://127.0.0.1:8000/categories/", values);
            } catch (error) { 
                alert(error)
                return
            }
            alert(`New category has been created`)
        };
        addCatToDatabase(values);
    }
    
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name}
              required={true}
            />
          </label>
          <button type="submit">Create Category</button>
        </form>
      </div>
    );
}
