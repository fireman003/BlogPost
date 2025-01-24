import { doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

function CreatePost(props) {

  const [fields, setFields] = useState([
    { name: 'title', type: 'text', value: '', placeholder: 'Title..'},
    { name: 'text', type: 'text', value: '', plasholder: 'Content..'},
    { name: 'image', type: 'file', value: '' },
    { name: 'title', type: 'text', value: '', placeholder: 'Title..'},
    { name: 'text', type: 'text', value: '', plasholder: 'Content..'}
]);

const [category, setCategory] = useState('');

const handleFieldChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    setFields(updatedFields);
};
const handleDeleteField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
}

const handleAddContent = () => {
    setFields([...fields, { name: 'text', value: '', placeholder: 'Content..' }]);
}
const handleAddImage = () => {
    setFields([...fields, { name: 'image', type: 'file', value: '' }]);
}

const handleAddVideo = () => {
    setFields([...fields, { name: 'video', type: 'file', value: '' }]);
}

const handleAddTitle = () => {
    setFields([...fields, { name: 'title', type: 'text', value: '', placeholder: 'Title..' }]);
}

const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user', props.uuid)
    formData.append('MainTitle', document.getElementById('mainTitle').value);
    fields.forEach((field) => {
        if(field.name === 'image') {
          formData.append(field.name, document.getElementById('mainTitle').value + '_' + props.uuid + '.png');
          //save that to firebase storage
        } else if (field.name === 'video') {
          formData.append(field.name, document.getElementById('mainTitle').value + '_' + props.uuid + '.mp4');
          //save that to firebase storage
        }
        else {
          formData.append(field.name, field.value);
        }
    });
    formData.append('category', document.getElementById('category').value);
    formData.append('language', document.getElementById('language').value);

    console.log(formData);
    fetch('http://localhost:3000/API/savePost', {  // Enter your IP address here
    method: 'POST', 
    mode: 'cors', 
    body: formData // body data type must match "Content-Type" header
    })
}

const handleOther = (e) => {
  setCategory(e.target.value);
}

  return (
    <div className="createPost">
      <h1>Create Post</h1>
      <input type="text" placeholder="Main title.." id="mainTitle" />
        {fields.map((field, index) => (
                <div key={index} className="grow" style={{ position: 'relative' }}>
                    {field.name === 'text' ? (
                      <textarea
                        name={field.name}
                        value={field.value}
                        placeholder={field.placeholder}
                        onChange={(e) => handleFieldChange(index, e)}
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        placeholder={field.placeholder}
                        onChange={(e) => handleFieldChange(index, e)}
                      />
                    )}
                   <button 
                      style={{ 
                          position: 'absolute', 
                          top: '0%',
                          color: 'red',
                          right: '2%', 
                          background: 'transparent', 
                          border: 'none', 
                          cursor: 'pointer',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 0, 0, 0.3)',
                          aspectRatio: '1/1',
                          width: '3em', 
                          marginRight: '1em',
                      }} 
                      onClick={() => handleDeleteField(index)}>
                      X
                  </button>
                </div>
            ))}

        <div>
          <button onClick={handleAddTitle}>Title</button>
          <button onClick={handleAddImage}>Image</button>
          <button onClick={handleAddContent}>Text</button>
          <button onClick={handleAddVideo}>Video</button>
        </div>
        <label>Category</label>
        <select id="category" name="category" onChange={handleOther}>
          <option value="Beauty">Beauty</option>
          <option value="Education">Education</option>
          <option value="Fun">Fun</option>
          <option value="Gaming">Gaming</option>
          <option value="Hobby">Hobby</option>
          <option value="Technology">Technology</option>
          <option value="Travel">Travel</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>

        {category === 'Other' && (
          <div style={
            {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '26em',
              color: 'black'
            }
          
          }>
            <label>Custom Category</label>
            <input type="text" placeholder="Enter custom category" className="createPost"/>
          </div>
        )}

        <label>Language</label>
        <select id="language" name="language">
          <option value="Albanian">Albanian</option>
          <option value="Arabic">Arabic</option>
          <option value="Belarusian">Belarusian</option>
          <option value="Bengali">Bengali</option>
          <option value="Bosnian">Bosnian</option>
          <option value="Bulgarian">Bulgarian</option>
          <option value="Chinese">Chinese</option>
          <option value="Croatian">Croatian</option>
          <option value="Czech">Czech</option>
          <option value="Danish">Danish</option>
          <option value="Dutch">Dutch</option>
          <option value="English">English</option>
          <option value="Estonian">Estonian</option>
          <option value="Faroese">Faroese</option>
          <option value="Finnish">Finnish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Greek">Greek</option>
          <option value="Hindi">Hindi</option>
          <option value="Hungarian">Hungarian</option>
          <option value="Icelandic">Icelandic</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="Kosovar">Kosovar</option>
          <option value="Latvian">Latvian</option>
          <option value="Lithuanian">Lithuanian</option>
          <option value="Luxembourgish">Luxembourgish</option>
          <option value="Macedonian">Macedonian</option>
          <option value="Moldovan">Moldovan</option>
          <option value="Montenegrin">Montenegrin</option>
          <option value="Norwegian">Norwegian</option>
          <option value="Polish">Polish</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Romanian">Romanian</option>
          <option value="Russian">Russian</option>
          <option value="Serbian">Serbian</option>
          <option value="Slovak">Slovak</option>
          <option value="Slovenian">Slovenian</option>
          <option value="Spanish">Spanish</option>
          <option value="Swedish">Swedish</option>
          <option value="Thai">Thai</option>
          <option value="Turkish">Turkish</option>
          <option value="Ukrainian">Ukrainian</option>
          <option value="Urdu">Urdu</option>
          <option value="Vietnamese">Vietnamese</option>
        </select>
        <button type="submit" onClick={handleSubmit}>Post</button>
    </div>
  )
}

export default CreatePost;