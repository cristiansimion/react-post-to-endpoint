import React, {Component} from 'react';
import FormData from "form-data";
import './style.css';

class App extends Component {

  state = {
    success: null,
    selectedFile: null,
    message: '',
  };

  handleFileSelect = (event) => {
    this.setState({
      success: null,
      selectedFile: event.target.files[0],
      message: '',
    })
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted: ', this.state.selectedFile);

    const formData = new FormData();
    formData.append('upload', this.state.selectedFile);

    try{
      const response = await fetch('http://localhost:3001/upload-local', {
        method: 'POST',
        body: formData
      });
      const json = await response.json();
      this.setState({
        ...json,
        message: json.success ? 'Successfully uploaded file: ' + json.file : 'Failed to upload file. Please check your file and try again.',
      });
    }
    catch(error) {
      this.setState({
        success: false,
        message: 'Failed to upload file. Please make sure your endpoint is working.',
      });
    }
  };

  render() {
    const notificationBackground = this.state.success === false ? "notification red" : "notification green";
    return (
      <div className="App">
        {(this.state.success || this.state.success !== null) &&
          <div className={notificationBackground}>{this.state.message}</div>
        }
        <form action="" method="post" onSubmit={this.handleSubmit}>
          <label htmlFor="file-upload">Please select your file</label>
          <input id="file-upload" type="file" name="upload" onChange={this.handleFileSelect} />
          <input type="submit" value="upload" />
        </form>
      </div>
    );
  }
}

export default App;
