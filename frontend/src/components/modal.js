import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import TextEditor from './textEditor';
function ModalExampleModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal 
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={ <Button style={{ position: "relative", right: "120px", top: "-72px" }} className="ui right floated secondary basic button">
      <h3 style={{ textAlign: "center", cursor: "pointer" }}>Create <i class="plus icon"></i></h3>
    </Button> }
    >
      <Modal.Header> Schedule Mail</Modal.Header>
      <Modal.Content>
     <TextEditor/>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
            Cancel
        </Button>
        <Button style={{backgroundColor:"#39A2DB",color:"#fff"}} onClick={() => setOpen(false)}>
           Send
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleModal
