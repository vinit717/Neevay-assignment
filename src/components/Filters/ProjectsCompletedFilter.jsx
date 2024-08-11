import React, { useState } from 'react';
import { actionTypes } from '../../store/searchReducer';


const ProjectsCompletedFilter = ({ dispatch, filters }) => {
    const [projects, setProjects] = useState(filters.minProjectsCompleted || 50);
    const [projectOpen, setProjectOpen] = useState(false);

    const handleProjectsDropdown = () => {
        setProjectOpen(!projectOpen);
    };

    const handleChangeProjects = (event) => {
        const value = parseInt(event.target.value);
        setProjects(value);
        dispatch({
            type: actionTypes.SET_FILTERS,
            payload: { minProjectsCompleted: value },
        });
    };

    return (
        <div>
            <button 
                onClick={handleProjectsDropdown} 
                className='w-full flex items-center justify-between text-base text-[#2F2F1C] font-semibold'
            >
                Min. Projects Completed
                <img 
                    src="https://storagereponeevaydevcdn.blob.core.windows.net/business/dropdown_arrow.svg" 
                    alt="v"
                    className={`transition-transform duration-300 ${projectOpen ? 'rotate-180' : 'rotate-0'}`} 
                />
            </button>
            {projectOpen && (
                <div className='mt-4'>
                    <input
                        id="projects"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={projects}
                        onChange={handleChangeProjects}
                        style={{
                            background: `linear-gradient(to right, #000 ${((projects - 0) / (100 - 0)) * 100}%, #ddd ${((projects - 0) / (100 - 0)) * 100}%)`,
                            accentColor: '#202020', 
                        }}
                        className="w-full h-[2px] bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>0</span>
                        <span>100+</span>
                    </div>
                    <div className="text-center mt-[-18px] text-sm text-gray-600">
                        {projects}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsCompletedFilter;