import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import './AddPost.scss'
import { v4 as randomString } from 'uuid';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';




 class AddPost extends React.Component {
    constructor(){
        super()
        this.state = {
            image_url: '',
            caption: '',
            // imgPlaceholder: true,
            isUploading: false,
            url: 'https://static.vecteezy.com/system/resources/previews/000/192/818/large_2x/vector-landscape-illustration.jpg',
        }
    }
    getSignedRequest = ([file]) => {
        this.setState({ isUploading: true });
        // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
    
        // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
        axios
          .get('/api/signs3', {
            params: {
              'file-name': fileName,
              'file-type': file.type,
            },
          })
          .then(response => {
              console.log('signedrequest', response.data)
              const { signedRequest, url } = response.data;
            this.uploadFile(file, signedRequest, url);
          })
          .catch(err => {
            console.log(err);
          });
      };
      uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        };
    
        axios
          .put(signedRequest, file, options)
          .then(response => {
            this.setState({ isUploading: false, url });
            console.log(response)// THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
            this.setState({image_url: url})
          })
          .catch(err => {
            this.setState({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                  err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          });
      };

    handleInput = (event) => {
        
        this.setState({
            [event.target.name]: event.target.value
        }) 
    }
    // toggleImg = () => {
    //     this.setState({imgPlaceholder: !this.state.imagePlaceholder})
    // }
    addPost = () => {
        const {image_url,caption} = this.state
        if(this.state.image_url !== ''){
        axios.post(`/api/add`,{image_url,caption})
        .then(res => {
            this.props.history.push('/profile')
        })
        .catch(err => console.log(err))
    }
    }
    // imgWatcher = () => {
    //     if (this.state.image_url !== ''){
    //         this.toggleImg()
    //     }
    // }

    render(){
        const { url, isUploading } = this.state;
    return (
        <div id='wholeAddPostContainer'>
        {/* <h3>{url}</h3> */}
        <img src={url} alt="" id='placeholderImage' />

        <Dropzone
                            onDropAccepted={this.getSignedRequest}
                            accept='image/*'
                            multiple={false}
                           >
                            {({getRootProps, getInputProps}) => (
                                <div className="dropzonecontainer">
                                    <div
                                        {...getRootProps({
                                        className: 'dropzone',
                                        onDrop: event => event.stopPropagation()
                                        })}
                                    >
                                        <input {...getInputProps()} />
                                        <button className='addPostButton'>Select from library</button> 
                                    </div>
                                </div>
                            )}  
                           </Dropzone>
               
            <input 
            className='inputs'
            placeholder='Caption goes here'
            type="text"
            name='caption'
            onChange={(event) => this.handleInput(event)}/>
            
            
            <button className='addPostButton' onClick={this.addPost}>Post!</button>
        </div>
    )
    }
}
const mapStateToProps = (reduxState) => {
    return reduxState 
}
export default connect(mapStateToProps) (AddPost)