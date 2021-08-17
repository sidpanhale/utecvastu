// import React from "react";
// import utecLogo from "../images/utecLogo.png";
// import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <>
//       <Navbar
//       style={{borderRadius : '0 0 30px 30px'}}
//         //className="rounded-bottom"
//         collapseOnSelect
//         expand="lg"
//         bg="dark"
//         variant="dark"
//       >
//         <Container>
//           <Navbar.Brand>
//             <Link to="/SolutionsNew">
//               <img
//                 style={{ height: "30px", width: "50px" }}
//                 src={utecLogo}
//                 alt=""
//               />
//             </Link>
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//           <Navbar.Collapse id="responsive-navbar-nav">
//             <Nav className="me-auto">
//               <Nav.Link href="#about">About</Nav.Link>
//               <Nav.Link href="#Learn">Learn</Nav.Link>
//               <Nav.Link href="#Solutions">Solutions</Nav.Link>
//             </Nav>
//             <Nav>
//               <NavDropdown title="English" id="collasible-nav-dropdown">
//                 <NavDropdown.Item href="#Hindi">Hindi</NavDropdown.Item>
//                 <NavDropdown.Item href="#Marathi">Marathi</NavDropdown.Item>
//                 <NavDropdown.Item href="#Gujarati">Gujarati</NavDropdown.Item>
//               </NavDropdown>
//               <Nav.Link href="#Support">Support</Nav.Link>
//               <Nav.Link href="#Myprojects">My Projects</Nav.Link>

//               {/* <Nav.Link eventKey={2} href="#memes">
//                 Dank memes
//               </Nav.Link> */}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </>
//   );
// }
