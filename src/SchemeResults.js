// src/SchemeResults.js
import React from 'react';

function SchemeResults({ schemes, schemeTypes }) {
    return (
        <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
            <h3>Matched Schemes</h3>
            {Object.entries(schemes).map(([category, list]) => (
                list.length > 0 && (
                    <div key={category}>
                        <h4>{schemeTypes.find(t => t.value === category)?.label} Schemes</h4>
                        <ul>
                            {list.map(scheme => (
                                <li key={scheme.name}>
                                    <strong>{scheme.name}</strong>: {scheme.desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            ))}
        </div>
    );
}

export default SchemeResults;