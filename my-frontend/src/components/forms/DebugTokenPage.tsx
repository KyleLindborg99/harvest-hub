import React from 'react';
import { useParams } from 'react-router-dom';
import { validateFormToken } from '../../config/formTokens';

export default function DebugTokenPage(): React.ReactElement {
    const { token } = useParams<{ token: string }>();
    
    console.log('Token from URL:', token);
    
    const formType = token ? validateFormToken(token) : null;
    
    console.log('Validated form type:', formType);
    
    return (
        <div style={{ padding: '20px', backgroundColor: 'lightblue' }}>
            <h1>Debug Token Page</h1>
            <p>Token: {token}</p>
            <p>Form Type: {formType}</p>
            <p>This should be visible!</p>
        </div>
    );
}