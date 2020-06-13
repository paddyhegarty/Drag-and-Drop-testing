import React, { useState } from 'react'
import productRows from './productRows'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const RowDragAndDrop = () => {

    const [ rows, setRows ] = useState(productRows)

    const onDragEnd = result => {
        if(!result.destination) return
        const { source, destination } = result
        const copiedItems = [...rows]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        setRows(copiedItems)
    }

    return (
        <div className="products">
            <h1>Product Rows</h1>
            <DragDropContext onDragEnd={result => onDragEnd(result)}>
                <Droppable droppableId="droppable-1">
                    {(provided, snapshot) => {
                        return(
                            <div {...provided.droppableProps} 
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver ? 'Lightlue' : 'Lightgrey',
                                    padding: 4
                                }}
                            >
                                {rows.map((row, index) => {
                                    return(
                                        <Draggable key={row.rowid} draggableId={row.rowid} index={index}>
                                            {(provided, snapshot) => {
                                                return(
                                                    <div className="row"
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        
                                                        style={{
                                                            userSelect: "none",
                                                            backgroundColor: snapshot.isDragging
                                                                ? "#f5f5f5"
                                                                : "#c5c5c5",
                                                            ...provided.draggableProps.style
                                                        }}
                                                    >
                                                        <div className="cell" {...provided.dragHandleProps}>{row.rowid}</div>
                                                        <div className="cell">{row.productservice}</div>
                                                        <div className="cell">{row.qty}</div>
                                                        <div className="cell">{row.rate}</div>
                                                        <div className="cell">{row.amount}</div>
                                                    </div>
                                                )
                                            }}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default RowDragAndDrop
