import React from 'react';
import {createRoot} from "react-dom/client";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import {App} from "./app/ui/App";

const container = document.getElementById('root');
if (!container) {
    throw new Error('root not found')
}

const root = createRoot(container)

root.render(
    <DndProvider backend={HTML5Backend}>
        <App />
    </DndProvider>
);


