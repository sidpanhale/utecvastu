// import React from "react";
// import { Card, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import solutions1pic from "../images/solutions1pic.png";
// import solutions2pic from "../images/solutions2pic.png";
// import "./Solutions.css";

// export default function Solutions() {
//   return (
//     <>
//       <div className="selectTextDiv">
//         <p className="selectTextP">PICK THE IDEAL TOOL FOR YOU:</p>
//       </div>
//       <Row xs={1} md={2} className="g-4">
//         <Col>
//           <Link
//             to="/compasstool"
//             style={{ textDecoration: "none", color: "#333333" }}
//           >
//             <Card
//               style={{ borderRadius: "20px", boxShadow:' 0px 4px 10px rgba(0, 0, 0, 0.1)' }}
//               className="mx-3 my-3 d-flex flex-row justify-content-between"
//             >
//               <Card.Img
//                 className="px-3 py-3"
//                 style={{
//                   height: "200px",
//                   width: "300px",
//                   borderRadius: "30px",
//                 }}
//                 variant="top"
//                 src={solutions1pic}
//               />
//               <Card.Body>
//                 <Card.Title>Compass Tool</Card.Title>
//                 <p style={{ color: "grey" }}>Output Time: 1 min</p>
//                 <Card.Text>
//                   Point in the direction of specific rooms to know their
//                   suitability according to Vaastu guidelines.
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Link>
//         </Col>
//         <Col>
//           <Link
//             to="/vastutool"
//             style={{ textDecoration: "none", color: "#333333" }}
//           >
//             <Card
//               style={{ borderRadius: "20px", boxShadow:' 0px 4px 10px rgba(0, 0, 0, 0.1)' }}
//               className="mx-3 my-3 d-flex flex-row justify-content-between"
//             >
//               <Card.Img
//                 className="px-3 py-3"
//                 style={{
//                   height: "200px",
//                   width: "300px",
//                   borderRadius: "30px",
//                 }}
//                 variant="top"
//                 src={solutions2pic}
//               />
//               <Card.Body>
//                 <Card.Title>Vaastu Score Check</Card.Title>
//                 <p style={{ color: "grey" }}>Output Time: 5 mins</p>
//                 <Card.Text>
//                   Input the location of all rooms in your home and get a Vaastu
//                   score instantly.
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Link>
//         </Col>
//       </Row>
//     </>
//   );
// }
