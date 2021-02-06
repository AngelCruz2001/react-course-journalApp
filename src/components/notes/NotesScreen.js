import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, deleteNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NotesScreen = () => {
    const dispatch = useDispatch()
    const { active: note } = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note);
    const { title, body, id } = formValues;

    const noteId = useRef(note.id)

    useEffect(() => {
        if (note.id != noteId.current) {
            reset(note);
            noteId.current = note.id;
        }
    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }))
    }, [formValues]);
    const handleDelete = () => {
        dispatch(startDeleting(id))
    }
    return (
        <div className="notes__main-content animate__animated animate__bounceInDown animate__faster" >

            <NotesAppBar />

            <div className="notes__content">

                <input
                    className="notes__title-input"
                    type="text"
                    placeholder="Some awesome title"
                    autoComplete="off"
                    onChange={handleInputChange}
                    value={title}
                    name='title'
                />

                <textarea
                    className="notes__text-area"
                    placeholder="What happend today"
                    onChange={handleInputChange}
                    value={body}
                    name='body'
                />


                {
                    (note.url) &&
                    <div className="notes__image">
                        <img
                            src={note.url}
                            alt="Imagen"
                        />
                    </div>
                }

            </div>
            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    )
}
