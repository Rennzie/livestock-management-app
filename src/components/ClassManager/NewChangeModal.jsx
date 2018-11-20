// import React, { Component } from 'react';
//
// import {
//   Modal,
//   Typography
// } from '@material-ui/core';
//
// import withStyles from '@material-ui/core/styles';
//
// const styles = theme => ({
//   paper: {
//     position: 'absolute',
//     width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4
//   }
// });
//
//
// class NewChangeModal extends Component {
//
//
//   render() {
//
//     const {classes, open, handleClose } = this.props;
//
//     return(
//       <Modal
//         aria-labelledby="simple-modal-title"
//         aria-describedby="simple-modal-description"
//         open={open}
//         onClose={handleClose}
//       >
//         <div className={classes.paper}>
//           <Typography variant="h6" id="modal-title">
//            Text in a modal
//           </Typography>
//           <Typography variant="subtitle1" id="simple-modal-description">
//            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
//           </Typography>
//           <NewChangeModalWrapped />
//         </div>
//       </Modal>
//     );
//   }
//
// }
//
// const NewChangeModalWrapped =  withStyles(styles)(NewChangeModal);
//
// export default NewChangeModalWrapped;
