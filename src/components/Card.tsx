import React, { Children, ReactNode, useState } from 'react';
import { Card, Input, Switch, Button } from 'antd';
// import 'antd/dist/antd.css';


interface CardContentProps {
    children: ReactNode;
  }
  
  const CardContent: React.FC<CardContentProps> = ({ children }) => {

  return (
    <Card className="max-w-md mx-auto p-2 shadow-lg rounded-lg">
        {children}
    </Card>
  );
};

export default CardContent;
