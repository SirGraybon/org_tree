import { useState, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { motion } from "framer-motion";
import Arrow, { DIRECTION } from "react-arrows";

function App() {
  const constraintsRef = useRef(null);

  let employees = [
    {
      fullName: "Mike Wozowski",
      directReports: [
        { fullName: "sully", directReports: [] },
        { fullName: "heather", directReports: [{ fullName: "graydon", directReports: [] }] },
      ],
    },
  ];

  const establishRoot = function () {
    const root = employees[0];
    const directReports = employees[0].directReports;
    
    if (root) {
      return (
        <>
          <motion.div
            id={root.fullName}
            className="card"
            drag
            dragConstraints={constraintsRef}
            whileHover={{ scale: 1.2 }}
            whileTap={{
              scale: 0.8,
            }}
            >{root.fullName}</motion.div>
            
        </>
      );
    }
  };
  
  const buildTree = function(node){

    const directReports = node.directReports;
    if (directReports){
      for(let i = 0; i < directReports.length; i++){
        buildTree(directReports[i])
      }
      return(
        <motion.div
        id={node.fullName + "'s Direct Reports"}
        className="card"
        drag
        dragConstraints={constraintsRef}
        whileHover={{ scale: 1.2 }}
        whileTap={{
          scale: 0.8,
        }}
        >
      {    directReports.map((report) => {
          // buildTree(directReports[0])

         return (
          <div className="label" key={report.fullName}>
            {report.fullName}

          </div>

         ) })}

        </motion.div>
        )
    }
  }
  const drawLines = function(node){
    if (node) {
      drawLines(node.directReports)
      return (
        <Arrow
        className="arrow"
        from={{
          direction: DIRECTION.BOTTOM,
          node: () => document.getElementById(`${node.fullName}`),
          translation: [0, 1],
        }}
        to={{
          direction: DIRECTION.TOP,
          node: () => document.getElementById(`${node.fullName}'s Direct Reports`),
          translation: [0, -1],
        }}
        // onChange={...}
      />
      )
    }
  }

  return (
    <>
    <motion.div className="container" ref={constraintsRef}>

    {establishRoot()}
    {buildTree(employees[0])}
    {drawLines(employees[0])}
    </motion.div>
      {/* <Arrow
        className="arrow"
        from={{
          direction: DIRECTION.BOTTOM,
          node: () => document.getElementById("president"),
          translation: [0, 1],
        }}
        to={{
          direction: DIRECTION.TOP,
          node: () => document.getElementById("vice president"),
          translation: [0, -1],
        }}
        // onChange={...}
      />
      <Arrow
        className="arrow"
        from={{
          direction: DIRECTION.BOTTOM,
          node: () => document.getElementById("president"),
          translation: [0, 1],
        }}
        to={{
          direction: DIRECTION.TOP,
          node: () => document.getElementById("vice president 2"),
          translation: [0, -1],
        }}
        // onChange={...}
      />
      <motion.div className="container" ref={constraintsRef}>
        <motion.div
          onClick={() => drawConnector}
          id="president"
          className="card"
          drag
          dragConstraints={constraintsRef}
          whileHover={{ scale: 1.2 }}
          whileTap={{
            scale: 0.8,
          }}
        ></motion.div>
        <motion.div
          id="vice president"
          className="card"
          drag
          dragConstraints={constraintsRef}
          whileHover={{ scale: 1.2 }}
          whileTap={{
            scale: 0.8,
          }}
        ></motion.div>
        <motion.div
          id="vice president 2"
          className="card"
          drag
          dragConstraints={constraintsRef}
          whileHover={{ scale: 1.2 }}
          whileTap={{
            scale: 0.8,
          }}
        ></motion.div>
      </motion.div> */}
    </>
  );
}

export default App;
