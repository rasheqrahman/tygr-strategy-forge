
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Calendar } from 'lucide-react';

interface DateSelectorProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

const DateSelector = ({ selectedDate, onDateSelect }: DateSelectorProps) => {
  return (
    <Card className="border-0 shadow-xl bg-white rounded-3xl">
      <CardHeader className="pb-8 p-10">
        <CardTitle className="text-3xl font-light text-slate-900 flex items-center gap-3">
          <Calendar className="h-8 w-8 text-orange-600" />
          Select a Date
        </CardTitle>
        <CardDescription className="text-slate-600 text-lg font-light">
          Please pick a date that is convenient for you. Available time slots will be shown for your selected date.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 pb-10">
        <CalendarComponent 
          mode="single" 
          selected={selectedDate} 
          onSelect={onDateSelect} 
          disabled={date => date < new Date() || date < new Date("1900-01-01")} 
          className="rounded-2xl border-slate-200 w-full [&>*]:w-full [&_table]:w-full [&_.rdp-month]:w-full [&_.rdp-table]:w-full" 
        />
      </CardContent>
    </Card>
  );
};

export default DateSelector;
