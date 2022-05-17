﻿﻿import React from 'react';

  let withRainbowFrame = colors => Component => props =>{
    let code =<Component {...props} />;
    for (var i=0; i<colors.length; i++) {
      code=<div style={{border:"solid 5px "+colors[i], padding: "5px"}}>{code}</div>;
    }
    return (
      <div style={{width:"500px", textAlign:"center"}}>
        {code}
      </div>
    )
  }

export {withRainbowFrame};