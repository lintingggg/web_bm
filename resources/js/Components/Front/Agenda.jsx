import React, { useState } from 'react';
import { IconChevronLeft, IconChevronRight, IconCalendarEvent, IconClock, IconMapPin, IconBrandWhatsapp } from '@tabler/icons-react';

export default function Agenda({ agendasProp = {} }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const formatDateKey = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const agendas = agendasProp;

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Convert Sunday=0 to Monday=0
    };

    const generateCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const totalDays = daysInMonth(month, year);
        const startingDay = firstDayOfMonth(month, year);
        const prevMonthDays = daysInMonth(month - 1, year);
        
        let days = [];
        
        // Previous month days
        for (let i = 0; i < startingDay; i++) {
            days.push({
                date: new Date(year, month - 1, prevMonthDays - startingDay + i + 1),
                isCurrentMonth: false,
            });
        }
        
        // Current month days
        for (let i = 1; i <= totalDays; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true,
            });
        }
        
        // Next month days to complete the grid (42 cells max usually, but let's just complete the row)
        const remainingCells = (7 - (days.length % 7)) % 7;
        for (let i = 1; i <= remainingCells; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
            });
        }
        
        return days;
    };

    const calendarDays = generateCalendar();
    
    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };
    
    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];


    const selectedDateKey = formatDateKey(selectedDate);
    const selectedAgendas = agendas[selectedDateKey] || [];

    return (
        <section className="w-full px-4 py-16 sm:px-6 lg:px-8 bg-white dark:bg-surface-base transition-colors duration-200">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-text-primary sm:text-4xl">
                        Agenda Kegiatan
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-text-secondary">
                        Jadwal acara dan kegiatan mendatang.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Calendar Card */}
                    <div className="w-full lg:w-[45%] bg-[#f8f9fa] dark:bg-surface-muted rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-neutral-100 dark:border-surface-muted/50">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 px-2">
                            <button onClick={prevMonth} className="text-slate-500 hover:text-accent-orange dark:hover:text-accent-orange transition-colors focus-visible:outline-none focus-visible:text-accent-orange">
                                <IconChevronLeft size={20} />
                            </button>
                            <h3 className="font-bold text-slate-700 dark:text-text-primary">
                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </h3>
                            <button onClick={nextMonth} className="text-slate-500 hover:text-accent-orange dark:hover:text-accent-orange transition-colors focus-visible:outline-none focus-visible:text-accent-orange">
                                <IconChevronRight size={20} />
                            </button>
                        </div>

                        {/* Days of Week */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {dayNames.map((day, idx) => (
                                <div key={idx} className="text-center text-xs font-medium text-slate-500 py-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-7 gap-1 sm:gap-2">
                            {calendarDays.map((dayObj, idx) => {
                                const dateKey = formatDateKey(dayObj.date);
                                const isSelected = selectedDateKey === dateKey;
                                const hasAgenda = agendas[dateKey] && agendas[dateKey].length > 0;
                                const isSunday = dayObj.date.getDay() === 0;

                                let textClass = "text-slate-700 dark:text-slate-300";
                                if (!dayObj.isCurrentMonth) {
                                    textClass = "text-slate-300 dark:text-slate-600";
                                    if (isSunday) textClass = "text-red-300 dark:text-red-900/50";
                                } else if (isSunday) {
                                    textClass = "text-red-500";
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedDate(dayObj.date)}
                                        className={`relative aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary
                                            ${isSelected 
                                                ? 'bg-accent-primary/10 dark:bg-accent-primary/20 border-2 border-accent-primary text-accent-primary' 
                                                : 'bg-white dark:bg-surface-muted border border-neutral-100 dark:border-surface-muted/80 hover:border-accent-orange/50 shadow-sm'}
                                        `}
                                    >
                                        <span className={isSelected ? 'text-accent-primary' : textClass}>
                                            {dayObj.date.getDate()}
                                        </span>
                                        {hasAgenda && (
                                            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[12px] border-l-[12px] border-b-accent-primary/50 border-l-transparent rounded-br-lg"></div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="w-full lg:w-[55%] flex flex-col bg-[#f8f9fa] dark:bg-surface-muted rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-neutral-100 dark:border-surface-muted/50 overflow-hidden min-h-[400px]">
                        <div className="bg-accent-primary text-surface-base text-center py-4 font-bold text-lg">
                            {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                        </div>
                        
                        <div className="flex-1 p-6 flex flex-col relative bg-white dark:bg-surface-base/50">
                            {selectedAgendas.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center text-slate-400">
                                    Belum ada agenda
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {selectedAgendas.map((agenda) => (
                                        <div key={agenda.id} className="flex gap-4">
                                            <div className="shrink-0">
                                                <div className="w-12 h-12 bg-accent-primary rounded-full flex items-center justify-center text-surface-base">
                                                    <IconCalendarEvent size={24} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 pt-1">
                                                <h4 className="font-semibold text-slate-800 dark:text-text-primary text-[15px] leading-snug">
                                                    {agenda.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-slate-500 dark:text-text-secondary text-sm">
                                                    <IconClock size={16} />
                                                    {agenda.time}
                                                </div>
                                                <div className="flex items-start gap-2 text-slate-500 dark:text-text-secondary text-sm">
                                                    <IconMapPin size={16} className="shrink-0 mt-0.5" />
                                                    <span>{agenda.location}</span>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
