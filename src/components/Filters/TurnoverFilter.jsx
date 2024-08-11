import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import { actionTypes } from '../../store/searchReducer';

const TurnoverFilter = ({ dispatch, filters }) => {
    const [range, setRange] = useState(filters.turnoverRange || [0, 100]);
    const [turnover, setTurnover] = useState(false);

    const handleTurnoverDropdown = () => { setTurnover(!turnover); };

    const handleSliderChange = (values) => {
        setRange(values);
        dispatch({
            type: actionTypes.SET_FILTERS,
            payload: { turnoverRange: values },
        });
    };

    return (
        <div>
            <button
                onClick={handleTurnoverDropdown}
                className='w-full flex items-center justify-between text-base text-[#2F2F1C] font-semibold'
            >
                Turnover
                <img
                    src="https://storagereponeevaydevcdn.blob.core.windows.net/business/dropdown_arrow.svg"
                    alt="v"
                />
            </button>
            {turnover && (
                <div>
                    <ReactSlider
                        className="w-full h-6 mt-4 mb-8 flex items-center justify-center"
                        thumbClassName="h-6 w-6 bg-white rounded-full cursor-pointer flex items-center justify-center border border-gray-300"
                        trackClassName="h-[2px] bg-[#AEAEAE]"
                        min={0}
                        max={100}
                        step={1}
                        value={range}
                        onChange={handleSliderChange}
                        renderThumb={(props, state) => (
                            <div
                                {...props}
                                className="h-6 w-6 bg-white rounded-full cursor-pointer flex items-center justify-center border border-gray-300"
                            >
                                <div className="absolute bottom-[-25px] px-2 py-1 rounded text-xs  ">
                                    {state.valueNow}
                                </div>
                            </div>
                        )}
                    />
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex flex-col justify-center items-center py-1 px-4 border border-gray-400">
                            <span className='text-sm'>Minimum</span>
                            <div className='text-base font-bold text-[#464646]'>
                                ₹ {range[0]} Lakh
                            </div>
                        </div>
                        <div className='w-4 h-[1px] bg-gray-400'></div>
                        <div className="flex flex-col items-center py-1 px-4 border border-gray-400">
                            <span className='text-sm'>Maximum</span>
                            <div className='text-base font-bold text-[#464646]'>
                                ₹ {range[1]} Lakh
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TurnoverFilter;