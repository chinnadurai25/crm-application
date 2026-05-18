import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { FileSpreadsheet, Upload, X, CheckCircle2, AlertCircle, Download, Loader2 } from 'lucide-react';
import { useAppDispatch } from '../../store';
import { bulkCreateLeads } from '../../store/slices/leadSlice';
import { cn } from '../../utils/cn';

const BulkUploadLeads: React.FC = () => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setResult(null);

    try {
      const response = await dispatch(bulkCreateLeads(file)).unwrap();
      setResult({
        success: true,
        message: response.message || `Successfully imported leads.`,
      });
      setFile(null);
    } catch (error: any) {
      setResult({
        success: false,
        message: error || 'Failed to upload leads. Please check the file format.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadTemplate = () => {
    // Define the template data
    const templateData = [
      {
        'Name': 'John Doe',
        'Email': 'john@example.com',
        'Phone': '+1 234 567 890',
        'Company': 'Example Corp',
        'Source': 'Website',
        'Status': 'New',
        'Notes': 'Interested in CRM services',
      },
      {
        'Name': 'Jane Smith',
        'Email': 'jane@test.com',
        'Phone': '+1 987 654 321',
        'Company': 'Test Inc',
        'Source': 'Referral',
        'Status': 'Contacted',
        'Notes': 'Needs a demo next week',
      }
    ];

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(templateData);
    
    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads Template');
    
    // Generate buffer and trigger download
    XLSX.writeFile(workbook, 'CRM_Leads_Template.xlsx');
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-4">
          <div
            {...getRootProps()}
            className={cn(
              "relative border-2 border-dashed rounded-3xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-4",
              isDragActive ? "border-indigo-500 bg-indigo-50/50" : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50",
              file ? "border-emerald-500 bg-emerald-50/30" : ""
            )}
          >
            <input {...getInputProps()} />
            
            {!file ? (
              <>
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-2">
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Click or drag Excel file here</h3>
                  <p className="text-slate-500 text-sm mt-1">Support .xlsx and .xls files (Max 5MB)</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-2">
                  <FileSpreadsheet className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{file.name}</h3>
                  <p className="text-emerald-600 text-sm font-medium mt-1">
                    {(file.size / 1024).toFixed(2)} KB • Ready to upload
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {result && (
            <div className={cn(
              "p-4 rounded-2xl flex items-start gap-3 animate-slide-up",
              result.success ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-rose-50 text-rose-800 border border-rose-100"
            )}>
              {result.success ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
              <p className="text-sm font-medium">{result.message}</p>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              onClick={removeFile}
              disabled={!file || isUploading}
              className="px-6 py-3 text-sm font-bold text-slate-600 hover:text-slate-800 disabled:opacity-50 transition-all"
            >
              Clear
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="px-10 py-3 bg-indigo-600 rounded-xl text-sm font-bold text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:shadow-none transition-all flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Start Import
                </>
              )}
            </button>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">How it works</h3>
          
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Download the <span className="font-bold text-slate-900">sample template</span> or prepare your own Excel sheet.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</div>
              <div className="space-y-2">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ensure the first row contains these exact column names:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Name', 'Email', 'Phone', 'Company', 'Source', 'Status', 'Notes'].map(col => (
                    <span key={col} className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider",
                      col === 'Name' || col === 'Email' ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-600"
                    )}>
                      {col}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] text-amber-600 font-medium">* Name and Email are required</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Upload the file and we'll automatically create the leads for you.
              </p>
            </li>
          </ul>

          <div className="pt-4 border-t border-slate-200">
            <button 
              onClick={downloadTemplate}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadLeads;
