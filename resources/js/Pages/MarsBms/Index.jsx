import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, Trash2, Music } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ marsBm }) {
    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        title: marsBm?.title || 'Mars Blue Murder',
        lyrics: marsBm?.lyrics || '',
        is_active: marsBm?.is_active ?? true,
        audio_file: null,
        cover_file: null,
    });

    const [audioPreview, setAudioPreview] = useState(
        marsBm?.audio_path ? `/storage/${marsBm.audio_path}` : null
    );
    const [coverPreview, setCoverPreview] = useState(
        marsBm?.cover_path ? `/storage/${marsBm.cover_path}` : null
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mars-bms.store'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data Mars BM berhasil diperbarui',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
            },
        });
    };

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        setData('audio_file', file);
        if (file) {
            setAudioPreview(URL.createObjectURL(file));
        } else {
            setAudioPreview(marsBm?.audio_path ? `/storage/${marsBm.audio_path}` : null);
        }
    };

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        setData('cover_file', file);
        if (file) {
            setCoverPreview(URL.createObjectURL(file));
        } else {
            setCoverPreview(marsBm?.cover_path ? `/storage/${marsBm.cover_path}` : null);
        }
    };

    const handleDeleteAudio = () => {
        if (!marsBm?.id || !marsBm?.audio_path) return;
        
        Swal.fire({
            title: 'Hapus Audio?',
            text: "File audio akan dihapus permanen.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('mars-bms.destroyAudio', marsBm.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        setAudioPreview(null);
                        setData('audio_file', null);
                    }
                });
            }
        });
    };

    const handleDeleteCover = () => {
        if (!marsBm?.id || !marsBm?.cover_path) return;
        
        Swal.fire({
            title: 'Hapus Cover?',
            text: "Gambar cover akan dihapus permanen.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('mars-bms.destroyCover', marsBm.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        setCoverPreview(null);
                        setData('cover_file', null);
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-slate-800 dark:text-slate-200">
                        Pengaturan Mars BM
                    </h2>
                </div>
            }
        >
            <Head title="Mars BM" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-slate-800 sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Judul
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700 dark:text-white sm:text-sm"
                                        required
                                    />
                                    {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Cover Image Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            Cover Art (Opsional)
                                        </label>
                                        <div className="flex flex-col items-center justify-center w-full">
                                            {coverPreview ? (
                                                <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 group">
                                                    <img src={coverPreview} alt="Cover" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                        <label className="cursor-pointer p-2 bg-white rounded-full text-slate-800 hover:bg-slate-200">
                                                            <Upload size={20} />
                                                            <input type="file" className="hidden" accept="image/*" onChange={handleCoverChange} />
                                                        </label>
                                                        {marsBm?.cover_path && (
                                                            <button type="button" onClick={handleDeleteCover} className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600">
                                                                <Trash2 size={20} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-8 h-8 mb-4 text-slate-500 dark:text-slate-400" />
                                                        <p className="mb-2 text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, WEBP (Max. 2MB)</p>
                                                    </div>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleCoverChange} />
                                                </label>
                                            )}
                                        </div>
                                        {errors.cover_file && <p className="mt-1 text-sm text-red-600">{errors.cover_file}</p>}
                                    </div>

                                    {/* Audio File Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            File Audio (MP3/WAV)
                                        </label>
                                        <div className="space-y-4">
                                            {audioPreview ? (
                                                <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2 text-primary font-medium">
                                                            <Music size={20} />
                                                            <span>Audio Terpasang</span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <label className="cursor-pointer p-1.5 text-slate-500 hover:text-primary transition-colors">
                                                                <Upload size={18} />
                                                                <input type="file" className="hidden" accept="audio/*" onChange={handleAudioChange} />
                                                            </label>
                                                            {marsBm?.audio_path && (
                                                                <button type="button" onClick={handleDeleteAudio} className="p-1.5 text-slate-500 hover:text-red-500 transition-colors">
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <audio controls src={audioPreview} className="w-full" />
                                                </div>
                                            ) : (
                                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 dark:hover:bg-bray-800 dark:bg-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Music className="w-8 h-8 mb-3 text-slate-500 dark:text-slate-400" />
                                                        <p className="text-sm text-slate-500 dark:text-slate-400"><span className="font-semibold">Upload file audio</span> (.mp3, .wav)</p>
                                                    </div>
                                                    <input type="file" className="hidden" accept="audio/*" onChange={handleAudioChange} />
                                                </label>
                                            )}
                                        </div>
                                        {errors.audio_file && <p className="mt-1 text-sm text-red-600">{errors.audio_file}</p>}
                                    </div>
                                </div>

                                {/* Lyrics */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                        Lirik
                                    </label>
                                    <textarea
                                        rows={12}
                                        value={data.lyrics}
                                        onChange={e => setData('lyrics', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary dark:border-slate-600 dark:bg-slate-700 dark:text-white sm:text-sm font-mono"
                                        placeholder="Tuliskan lirik di sini..."
                                    />
                                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Gunakan enter/baris baru untuk memisahkan bait.</p>
                                    {errors.lyrics && <p className="mt-1 text-sm text-red-600">{errors.lyrics}</p>}
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            className="rounded border-slate-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:border-slate-600 dark:bg-slate-700"
                                        />
                                        <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">Aktifkan Halaman Mars BM</span>
                                    </label>
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-primary/90 focus:bg-primary/90 active:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                    >
                                        <Save size={16} />
                                        Simpan Perubahan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
