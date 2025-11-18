import jsPDF from 'jspdf';
import { DaySelection } from '@/store/slices/bookingSlice';
import { BOARD_TYPES } from '../constants/data';
import { calculateDayTotal, calculateGrandTotal, formatDate, getHotelName, getMealName } from './calculations';

interface BookingData {
  citizenship: string;
  destinationCountry: string;
  startDate: string;
  numberOfDays: string;
  boardType: string;
  dailySelections: DaySelection[];
}

export const exportToPDF = (bookingData: BookingData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = margin;

  // Title
  doc.setFontSize(24);
  doc.setTextColor(75, 73, 65); // luxe-lime color
  doc.text('LuxeStay Booking Summary', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;

  // Configuration Summary
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('Configuration Summary', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.text(`Citizenship: ${bookingData.citizenship}`, margin, yPosition);
  yPosition += 7;
  doc.text(`Destination: ${bookingData.destinationCountry}`, margin, yPosition);
  yPosition += 7;
  doc.text(
    `Travel Dates: ${formatDate(bookingData.startDate)} (${bookingData.numberOfDays} days)`,
    margin,
    yPosition
  );
  yPosition += 7;
  doc.text(
    `Board Type: ${BOARD_TYPES.find((b) => b.code === bookingData.boardType)?.name || ''}`,
    margin,
    yPosition
  );
  yPosition += 15;

  // Daily Selections
  doc.setFontSize(16);
  doc.text('Daily Selections', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  bookingData.dailySelections.forEach((day, index) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = margin;
    }

    const dayTotal = calculateDayTotal(day, bookingData.destinationCountry);
    doc.setFontSize(12);
    doc.text(`Day ${day.day} - ${formatDate(day.date)}`, margin, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.text(`Hotel: ${getHotelName(day.hotelId, bookingData.destinationCountry)}`, margin + 5, yPosition);
    yPosition += 6;
    if (day.lunchId) {
      doc.text(
        `Lunch: ${getMealName('lunch', day.lunchId, bookingData.destinationCountry)}`,
        margin + 5,
        yPosition
      );
      yPosition += 6;
    }
    if (day.dinnerId) {
      doc.text(
        `Dinner: ${getMealName('dinner', day.dinnerId, bookingData.destinationCountry)}`,
        margin + 5,
        yPosition
      );
      yPosition += 6;
    }
    doc.setFontSize(11);
    doc.setTextColor(75, 73, 65);
    doc.text(`Day Total: $${dayTotal}`, margin + 5, yPosition);
    doc.setTextColor(0, 0, 0);
    yPosition += 10;
  });

  // Grand Total
  yPosition += 5;
  const grandTotal = calculateGrandTotal(bookingData.dailySelections, bookingData.destinationCountry);
  doc.setFontSize(18);
  doc.setTextColor(75, 73, 65);
  doc.text(
    `Grand Total: $${grandTotal}`,
    pageWidth - margin,
    yPosition,
    { align: 'right' }
  );

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text(
    `Generated on ${new Date().toLocaleString()}`,
    pageWidth / 2,
    doc.internal.pageSize.getHeight() - 10,
    { align: 'center' }
  );

  doc.save(`LuxeStay-Booking-${Date.now()}.pdf`);
};

export const printBooking = (bookingData: BookingData): void => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>LuxeStay Booking Summary</title>
        <style>
          body {
            font-family: 'Inter', sans-serif;
            padding: 40px;
            color: #333;
          }
          h1 {
            color: #4B4941;
            text-align: center;
            margin-bottom: 30px;
          }
          .section {
            margin-bottom: 30px;
          }
          .section h2 {
            color: #333;
            border-bottom: 2px solid #4B4941;
            padding-bottom: 10px;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
          }
          .day-section {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
          }
          .day-header {
            font-weight: bold;
            margin-bottom: 10px;
            color: #4B4941;
          }
          .day-detail {
            margin-left: 20px;
            margin-bottom: 5px;
          }
          .total {
            text-align: right;
            font-size: 24px;
            font-weight: bold;
            color: #4B4941;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #4B4941;
          }
          @media print {
            body { padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>LuxeStay Booking Summary</h1>
        
        <div class="section">
          <h2>Configuration Summary</h2>
          <div class="info-row">
            <span>Citizenship:</span>
            <span>${bookingData.citizenship}</span>
          </div>
          <div class="info-row">
            <span>Destination:</span>
            <span>${bookingData.destinationCountry}</span>
          </div>
          <div class="info-row">
            <span>Travel Dates:</span>
            <span>${formatDate(bookingData.startDate)} (${bookingData.numberOfDays} days)</span>
          </div>
          <div class="info-row">
            <span>Board Type:</span>
            <span>${BOARD_TYPES.find((b) => b.code === bookingData.boardType)?.name || ''}</span>
          </div>
        </div>

        <div class="section">
          <h2>Daily Selections</h2>
          ${bookingData.dailySelections
            .map(
              (day) => `
            <div class="day-section">
              <div class="day-header">Day ${day.day} - ${formatDate(day.date)}</div>
              <div class="day-detail">Hotel: ${getHotelName(day.hotelId, bookingData.destinationCountry)}</div>
              ${day.lunchId ? `<div class="day-detail">Lunch: ${getMealName('lunch', day.lunchId, bookingData.destinationCountry)}</div>` : ''}
              ${day.dinnerId ? `<div class="day-detail">Dinner: ${getMealName('dinner', day.dinnerId, bookingData.destinationCountry)}</div>` : ''}
              <div class="day-detail" style="font-weight: bold; color: #4B4941; margin-top: 5px;">
                Day Total: $${calculateDayTotal(day, bookingData.destinationCountry)}
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="total">
          Grand Total: $${calculateGrandTotal(bookingData.dailySelections, bookingData.destinationCountry)}
        </div>

        <div style="text-align: center; margin-top: 40px; color: #888; font-size: 12px;">
          Generated on ${new Date().toLocaleString()}
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};

