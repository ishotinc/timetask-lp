"use client"

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { Plus, X, Play, Pause } from 'lucide-react'
import { Button } from "@/app/_components/atoms/Button"
import { Input } from "@/app/_components/atoms/Input"
import { Card, CardContent } from "@/app/_components/atoms/card"

type Task = {
  id: string
  content: string
  elapsedTime: number
  isRunning: boolean
}

type TaskList = {
  id: string
  title: string
  tasks: Task[]
}

export function Project({ projectId }: { projectId: string }) {
  const [lists, setLists] = useState<TaskList[]>(() => [
    { id: uuidv4(), title: 'To Do', tasks: [] },
    { id: uuidv4(), title: 'In Progress', tasks: [] },
    { id: uuidv4(), title: 'Done', tasks: [] },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setLists(prevLists => 
        prevLists.map(list => ({
          ...list,
          tasks: list.tasks.map(task => 
            task.isRunning ? { ...task, elapsedTime: task.elapsedTime + 1 } : task
          )
        }))
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const addTask = (listId: string) => {
    const newTask: Task = { id: uuidv4(), content: 'New Task', elapsedTime: 0, isRunning: false }
    setLists(lists.map(list => 
      list.id === listId ? { ...list, tasks: [...list.tasks, newTask] } : list
    ))
  }

  const removeTask = (listId: string, taskId: string) => {
    setLists(lists.map(list => 
      list.id === listId ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) } : list
    ))
  }

  const toggleTimer = (listId: string, taskId: string) => {
    setLists(lists.map(list => 
      list.id === listId ? {
        ...list,
        tasks: list.tasks.map(task => 
          task.id === taskId ? { ...task, isRunning: !task.isRunning } : task
        )
      } : list
    ))
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId !== destination.droppableId) {
      const sourceList = lists.find(list => list.id === source.droppableId)
      const destList = lists.find(list => list.id === destination.droppableId)
      const sourceTask = sourceList?.tasks[source.index]

      if (sourceList && destList && sourceTask) {
        setLists(lists.map(list => {
          if (list.id === sourceList.id) {
            return { ...list, tasks: list.tasks.filter((_, idx) => idx !== source.index) }
          }
          if (list.id === destList.id) {
            const newTasks = Array.from(list.tasks)
            newTasks.splice(destination.index, 0, sourceTask)
            return { ...list, tasks: newTasks }
          }
          return list
        }))
      }
    } else {
      const list = lists.find(list => list.id === source.droppableId)
      if (list) {
        const newTasks = Array.from(list.tasks)
        const [reorderedTask] = newTasks.splice(source.index, 1)
        newTasks.splice(destination.index, 0, reorderedTask)
        setLists(lists.map(l => l.id === list.id ? { ...l, tasks: newTasks } : l))
      }
    }
  }

  const updateListTitle = (listId: string, newTitle: string) => {
    setLists(lists.map(list => 
      list.id === listId ? { ...list, title: newTitle } : list
    ))
  }

  const addList = () => {
    const newList: TaskList = { id: uuidv4(), title: 'New List', tasks: [] }
    setLists([...lists, newList])
  }

  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {lists.map(list => (
            <div key={list.id} className="bg-gray-100 p-4 rounded-lg w-72 flex-shrink-0">
              <Input
                value={list.title}
                onChange={(e) => updateListTitle(list.id, e.target.value)}
                className="font-semibold mb-2 bg-transparent border-none"
              />
              <Droppable droppableId={list.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px]"
                  >
                    {list.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2"
                          >
                            <CardContent className="p-2">
                              <div className="flex justify-between items-center mb-2">
                                <Input 
                                  value={task.content}
                                  onChange={(e) => {
                                    const newLists = lists.map(l => 
                                      l.id === list.id 
                                        ? { ...l, tasks: l.tasks.map(t => t.id === task.id ? { ...t, content: e.target.value } : t) }
                                        : l
                                    )
                                    setLists(newLists)
                                  }}
                                  className="border-none bg-transparent flex-grow mr-2"
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeTask(list.id, task.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center">
                                <span className="mr-2">{formatTime(task.elapsedTime)}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => toggleTimer(list.id, task.id)}
                                >
                                  {task.isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => addTask(list.id)}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Task
              </Button>
            </div>
          ))}
          <div className="flex items-start">
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={addList}
            >
              <Plus className="h-4 w-4 mr-2" /> Add List
            </Button>
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}
