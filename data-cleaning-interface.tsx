"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle, ArrowDown, CheckCircle2 } from "lucide-react"

// Initial data structure
const initialData = {
  columns: {
    categorical: {
      id: "categorical",
      title: "Categorical",
      items: [
        { id: "cat-1", content: "Gender", type: "categorical" },
        { id: "cat-2", content: "Country", type: "categorical" },
        { id: "cat-3", content: "Education", type: "categorical" },
        { id: "cat-4", content: "Status", type: "categorical" },
      ],
    },
    numerical: {
      id: "numerical",
      title: "Numerical",
      items: [
        { id: "num-1", content: "Age", type: "numerical" },
        { id: "num-2", content: "Income", type: "numerical" },
        { id: "num-3", content: "Years", type: "numerical" },
      ],
    },
    floatValues: {
      id: "floatValues",
      title: "Float Values",
      items: [
        { id: "float-1", content: "Height", type: "float" },
        { id: "float-2", content: "Weight", type: "float" },
        { id: "float-3", content: "Score", type: "float" },
      ],
    },
    nullNumerical: {
      id: "nullNumerical",
      title: "Numerical (Null)",
      items: [
        { id: "null-num-1", content: "Salary", type: "numerical", hasNull: true },
        { id: "null-num-2", content: "Experience", type: "numerical", hasNull: true },
      ],
    },
    nullCategorical: {
      id: "nullCategorical",
      title: "Categorical (Null)",
      items: [
        { id: "null-cat-1", content: "Occupation", type: "categorical", hasNull: true },
        { id: "null-cat-2", content: "Region", type: "categorical", hasNull: true },
      ],
    },
    fillNull: {
      id: "fillNull",
      title: "Fill Null",
      items: [],
    },
    convertToNumerical: {
      id: "convertToNumerical",
      title: "Convert to Numerical",
      items: [],
    },
    convertToCategorical: {
      id: "convertToCategorical",
      title: "Convert to Categorical",
      items: [],
    },
  },
  columnOrder: [
    "categorical",
    "numerical",
    "floatValues",
    "nullNumerical",
    "nullCategorical",
    "fillNull",
    "convertToNumerical",
    "convertToCategorical",
  ],
}

export default function DataCleaningInterface() {
  const [data, setData] = useState(initialData)
  const [processedColumns, setProcessedColumns] = useState<string[]>([])

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item was dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Only allow dragging from null columns to action columns
    const isSourceNullColumn = source.droppableId === "nullNumerical" || source.droppableId === "nullCategorical"
    const isDestActionColumn = ["fillNull", "convertToNumerical", "convertToCategorical"].includes(
      destination.droppableId,
    )

    if (!isSourceNullColumn || !isDestActionColumn) {
      toast({
        title: "Invalid Operation",
        description: "You can only drag columns with null values to action areas.",
        variant: "destructive",
      })
      return
    }

    // Get the item being dragged
    const sourceColumn = data.columns[source.droppableId]
    const item = sourceColumn.items[source.index]

    // Check if the action is appropriate for the column type
    if (destination.droppableId === "convertToNumerical" && item.type === "numerical") {
      toast({
        title: "Invalid Operation",
        description: "This column is already numerical.",
        variant: "destructive",
      })
      return
    }

    if (destination.droppableId === "convertToCategorical" && item.type === "categorical") {
      toast({
        title: "Invalid Operation",
        description: "This column is already categorical.",
        variant: "destructive",
      })
      return
    }

    // Create new arrays for the source and destination columns
    const sourceItems = Array.from(sourceColumn.items)
    const destColumn = data.columns[destination.droppableId]
    const destItems = Array.from(destColumn.items)

    // Remove the item from the source column
    sourceItems.splice(source.index, 1)

    // Add the item to the destination column
    destItems.splice(destination.index, 0, item)

    // Update the state with the new data
    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      },
    }

    setData(newData)
    setProcessedColumns([...processedColumns, item.id])

    // Show success message
    let actionMessage = ""
    if (destination.droppableId === "fillNull") {
      actionMessage = "Null values filled in"
    } else if (destination.droppableId === "convertToNumerical") {
      actionMessage = "Converted to numerical"
    } else if (destination.droppableId === "convertToCategorical") {
      actionMessage = "Converted to categorical"
    }

    toast({
      title: "Action Applied",
      description: `${actionMessage} for column "${item.content}"`,
    })
  }

  const getColumnColor = (columnId: string) => {
    switch (columnId) {
      case "categorical":
      case "nullCategorical":
      case "convertToCategorical":
        return "bg-purple-50 border-purple-200"
      case "numerical":
      case "nullNumerical":
      case "convertToNumerical":
        return "bg-blue-50 border-blue-200"
      case "floatValues":
        return "bg-green-50 border-green-200"
      case "fillNull":
        return "bg-amber-50 border-amber-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getItemColor = (type: string, hasNull = false) => {
    if (hasNull) {
      return "border-red-300 bg-red-50"
    }

    switch (type) {
      case "categorical":
        return "border-purple-300 bg-purple-50"
      case "numerical":
        return "border-blue-300 bg-blue-50"
      case "float":
        return "border-green-300 bg-green-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "categorical":
        return "bg-purple-100 text-purple-800"
      case "numerical":
        return "bg-blue-100 text-blue-800"
      case "float":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      {/* Action Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {["fillNull", "convertToNumerical", "convertToCategorical"].map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-lg border-2 border-dashed min-h-[120px] ${
                    snapshot.isDraggingOver ? "bg-gray-100" : getColumnColor(columnId)
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-3">{data.columns[columnId].title}</h3>
                  {data.columns[columnId].items.map((item, index) => (
                    <div key={item.id} className="mb-2 p-2 bg-white rounded border shadow-sm">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                        <span>{item.content}</span>
                        <Badge className={`ml-2 ${getBadgeColor(item.type)}`}>{item.type}</Badge>
                      </div>
                    </div>
                  ))}
                  {provided.placeholder}
                  {data.columns[columnId].items.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-16 text-gray-400">
                      <ArrowDown className="h-5 w-5 mb-1" />
                      <p className="text-sm">Drop columns here</p>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Column Types */}
        {["categorical", "numerical", "floatValues"].map((columnId) => (
          <div key={columnId} className={`p-4 rounded-lg border ${getColumnColor(columnId)}`}>
            <h3 className="font-semibold text-lg mb-3">{data.columns[columnId].title}</h3>
            <div className="grid grid-cols-2 gap-2">
              {data.columns[columnId].items.map((item) => (
                <div key={item.id} className={`p-3 rounded border ${getItemColor(item.type)} shadow-sm`}>
                  <div className="flex items-center justify-between">
                    <span>{item.content}</span>
                    <Badge className={getBadgeColor(item.type)}>{item.type}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Columns to be acted on */}
      <h3 className="font-semibold text-xl mt-2">Columns to be acted on</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {["nullNumerical", "nullCategorical"].map((columnId) => (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-lg border ${
                    snapshot.isDraggingOver ? "bg-gray-100" : getColumnColor(columnId)
                  }`}
                >
                  <h3 className="font-semibold text-lg mb-3">{data.columns[columnId].title}</h3>
                  <div className="space-y-2">
                    {data.columns[columnId].items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        isDragDisabled={processedColumns.includes(item.id)}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-3 rounded border ${getItemColor(item.type, true)} shadow-sm ${
                              snapshot.isDragging ? "ring-2 ring-offset-2" : ""
                            } ${processedColumns.includes(item.id) ? "opacity-50" : ""}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <span>{item.content}</span>
                                {processedColumns.includes(item.id) && (
                                  <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {!processedColumns.includes(item.id) && (
                                  <AlertCircle className="h-4 w-4 text-red-500" />
                                )}
                                <Badge className={getBadgeColor(item.type)}>{item.type}</Badge>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {data.columns[columnId].items.length === 0 && (
                      <div className="text-center py-4 text-gray-400">
                        <p className="text-sm">No columns to clean</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}
